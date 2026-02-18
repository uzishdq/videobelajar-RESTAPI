import { z } from "zod";
import { IdSchema, validatedStringSchema } from "./helper.validation";

export const CreateCategorySchema = z.object({
  name: validatedStringSchema(),
});

export const UpdateCategorySchema = CreateCategorySchema.extend(IdSchema.shape);

export type CategoryInputType = z.infer<typeof CreateCategorySchema>;
export type CategoryUpdateType = z.infer<typeof UpdateCategorySchema>;
