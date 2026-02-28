import "express";
import { TUserRole } from "./src/utils/type/type.helper";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        img: string;
        role: TUserRole;
      };
    }
  }
}
