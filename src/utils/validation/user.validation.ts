import { z } from "zod";
import { email, phoneSchema, validatedStringSchema } from "./helper.validation";

export const updateProfileSchema = z.object({
  name: validatedStringSchema(5, 100),
  email: email,
  phoneNumber: phoneSchema,
});

export type UpdateProfileSchemaType = z.infer<typeof updateProfileSchema>;
