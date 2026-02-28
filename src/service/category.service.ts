import { asc, count, desc, eq, like } from "drizzle-orm";
import { db } from "../db";
import { category } from "../db/schema";
import {
  CategoryInputType,
  CategoryUpdateType,
} from "../utils/validation/category.validation";

export class CategoryService {
  async getAll(query: {
    page: number;
    limit: number;
    search?: string;
    sortOrder?: "asc" | "desc";
  }) {
    const { page, limit, search, sortOrder = "asc" } = query;
    const offset = (page - 1) * limit;

    const whereClause = search ? like(category.name, `%${search}%`) : undefined;

    const orderClause =
      sortOrder === "asc" ? asc(category.name) : desc(category.name);

    const [result, [{ total }]] = await Promise.all([
      db
        .select()
        .from(category)
        .where(whereClause)
        .orderBy(orderClause)
        .limit(limit)
        .offset(offset),
      db.select({ total: count() }).from(category).where(whereClause),
    ]);

    return {
      data: result,
      meta: {
        page,
        limit,
        total: Number(total),
        totalPages: Math.ceil(Number(total) / limit),
      },
    };
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
