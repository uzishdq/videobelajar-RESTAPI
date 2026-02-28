import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TUserRole } from "../utils/type/type.helper";

interface JwtPayload {
  id: string;
  name: string;
  email: string;
  img: string;
  role: TUserRole;
}

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "token salah" });
  }
};

export const authorize =
  (roles: TUserRole[]) => (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;

    if (!role) {
      return res.status(403).json({ message: "role tidak terdaftar" });
    }

    if (!roles.includes(role)) {
      return res.status(403).json({ message: "forbidden" });
    }

    next();
  };
