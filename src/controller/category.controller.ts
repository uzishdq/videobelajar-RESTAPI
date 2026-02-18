import { Response, Request } from "express";
import { CategoryService } from "../service/category.service";
import { errorResponse, successResponse } from "../utils/response.utils";
import { IdSchema } from "../utils/validation/helper.validation";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "../utils/validation/category.validation";

export class CategoryController {
  private readonly categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  async getAll(req: Request, res: Response) {
    try {
      const result = await this.categoryService.getAll();

      return successResponse(res, "Category fetched", result);
    } catch (error) {
      return errorResponse(res, error);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const validate = IdSchema.safeParse({ id: id });

      if (!validate.success) {
        throw validate.error;
      }

      const result = await this.categoryService.getById(validate.data.id);

      return successResponse(res, "Category fetched", result);
    } catch (error) {
      return errorResponse(res, error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const validate = CreateCategorySchema.safeParse(req.body);

      if (!validate.success) {
        throw validate.error;
      }

      const result = await this.categoryService.create(validate.data);

      return successResponse(res, "Category Created", result);
    } catch (error) {
      return errorResponse(res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const validate = UpdateCategorySchema.safeParse(req.body);

      if (!validate.success) {
        throw validate.error;
      }

      const result = await this.categoryService.update(validate.data);

      return successResponse(res, "Category Updated", result);
    } catch (error) {
      return errorResponse(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const validate = UpdateCategorySchema.safeParse(req.body);

      if (!validate.success) {
        throw validate.error;
      }

      const result = await this.categoryService.delete(validate.data.id);

      return successResponse(res, "Category Deleted", result);
    } catch (error) {
      return errorResponse(res, error);
    }
  }
}
