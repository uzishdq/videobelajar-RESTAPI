import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import {
  LoginInputSchemaType,
  RegisterInputSchemaType,
} from "../utils/validation/auth.validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TUserRole } from "../utils/type/type.helper";
import crypto from "crypto";
import { resend } from "../lib/resend";
import { verificationEmailTemplate } from "../utils/template/email-template";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export class AuthService {
  async register(data: RegisterInputSchemaType) {
    const [existing] = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.email, data.email))
      .limit(1);

    if (existing) {
      throw new Error("email sudah terdaftar");
    }

    const hashed = await bcrypt.hash(data.password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

    const payload = {
      email: data.email,
      password: hashed,
      img: "/assets/default-profile.png",
      name: data.name,
      phone: data.phoneNumber,
      job: "-",
      position: "-",
      verificationToken,
      verificationTokenExpiry,
    };

    await db.insert(users).values(payload).returning();

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: data.email,
      subject: "Verifikasi Email - VideoBelajar",
      html: verificationEmailTemplate(data.name, verificationToken),
    });
  }

  async verifyEmail(token: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.verificationToken, token))
      .limit(1);

    if (!user) throw new Error("token tidak valid");

    if (new Date() > user.verificationTokenExpiry!) {
      throw new Error("token sudah expired");
    }

    await db
      .update(users)
      .set({
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null,
      })
      .where(eq(users.id, user.id));
  }

  async login(data: LoginInputSchemaType) {
    const [isUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email))
      .limit(1);

    if (!isUser) {
      throw new Error("email tidak ditemukan");
    }

    const isCorrectPass = await bcrypt.compare(data.password, isUser.password);

    if (!isCorrectPass) {
      throw new Error("password tidak sesuai");
    }

    const payload = {
      id: isUser.id,
      name: isUser.name,
      email: isUser.email,
      img: isUser.img,
      role: isUser.role,
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: "24h",
    });

    await db
      .update(users)
      .set({ refreshToken: refreshToken })
      .where(eq(users.id, isUser.id));

    return { accessToken, refreshToken };
  }

  async logout(refreshToken: string) {
    const [user] = await db
      .select({ id: users.id, email: users.email })
      .from(users)
      .where(eq(users.refreshToken, refreshToken))
      .limit(1);

    if (!user) {
      return;
    }

    await db
      .update(users)
      .set({ refreshToken: null })
      .where(eq(users.id, user.id));
  }

  async refreshToken(token: string) {
    let payload;

    try {
      payload = jwt.verify(token, JWT_REFRESH_SECRET) as {
        id: string;
        name: string;
        email: string;
        img: string;
        role: TUserRole;
      };
    } catch (error) {
      throw new Error("Invalid refresh token");
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, payload.id));

    if (!user || user.refreshToken !== token) {
      throw new Error("Invalid refresh token");
    }

    const newAccessToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        img: user.img,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" },
    );

    return { accessToken: newAccessToken };
  }
}
