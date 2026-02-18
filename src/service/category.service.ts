import { eq } from "drizzle-orm";
import { db } from "../db";
import { category } from "../db/schema";
import {
  CategoryInputType,
  CategoryUpdateType,
} from "../utils/validation/category.validation";

export class CategoryService {
  async getAll() {
    const result = await db.select().from(category);

    return result;
  }

  async getById(id: string) {
    const result = await db.select().from(category).where(eq(category.id, id));

    if (!result) {
      throw new Error("category not found");
    }

    return result;
  }

  async create(data: CategoryInputType) {
    const result = await db.insert(category).values(data).returning();

    return result;
  }

  async update(data: CategoryUpdateType) {
    const result = await db
      .update(category)
      .set({ name: data.name })
      .where(eq(category.id, data.id))
      .returning();

    if (!result) {
      throw new Error("update data failed");
    }

    return result;
  }

  async delete(id: string) {
    const [result] = await db
      .delete(category)
      .where(eq(category.id, id))
      .returning();

    if (!result) {
      throw new Error("delete data failed");
    }

    return result;
  }
}
