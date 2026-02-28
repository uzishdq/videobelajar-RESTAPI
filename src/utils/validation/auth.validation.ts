import { z } from "zod";
import {
  email,
  password,
  phoneSchema,
  validatedStringSchema,
} from "./helper.validation";

export const registerSchema = z
  .object({
    name: validatedStringSchema(),
    email: email,
    phoneNumber: phoneSchema,
    password: password,
    confirmPassword: password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: email,
  password: password,
});

export type RegisterInputSchemaType = z.infer<typeof registerSchema>;
export type LoginInputSchemaType = z.infer<typeof loginSchema>;
