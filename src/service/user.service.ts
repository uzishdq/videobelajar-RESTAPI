import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { UpdateProfileSchemaType } from "../utils/validation/user.validation";
import { supabase } from "../lib/supabase-bucket";

export class UserService {
  async getById(id: string) {
    const [result] = await db
      .select({
        id: users.id,
        email: users.email,
        img: users.img,
        name: users.name,
        phone: users.phone,
        job: users.job,
        position: users.position,
        role: users.role,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result;
  }

  async updateProfile(id: string, data: UpdateProfileSchemaType) {
    const result = await db
      .update(users)
      .set({
        email: data.email,
        name: data.name,
        phone: data.phoneNumber,
      })
      .where(eq(users.id, id));

    return result;
  }

  async updateProfilePic(id: string, file: Express.Multer.File) {
    const ext = file.originalname.split(".").pop();
    const fileName = `${id}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("profile-pic")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw new Error(error.message);

    const { data } = supabase.storage
      .from("profile-pic")
      .getPublicUrl(fileName);

    await db.update(users).set({ img: data.publicUrl }).where(eq(users.id, id));

    return data.publicUrl;
  }
}
