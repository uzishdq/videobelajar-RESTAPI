import { Request, Response } from "express";
import { UserService } from "../service/user.service";
import { errorResponse, successResponse } from "../utils/response.utils";
import { updateProfileSchema } from "../utils/validation/user.validation";

export class userController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getById(req: Request, res: Response) {
    try {
      const userId = req.user?.id as string;

      const result = await this.userService.getById(userId);

      return successResponse(res, "profile user fetched", result);
    } catch (error) {
      return errorResponse(res, error);
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const parse = updateProfileSchema.safeParse(req.body);

      if (!parse.success) {
        throw parse.error;
      }

      const userId = req.user?.id as string;

      await this.userService.updateProfile(userId, parse.data);

      return successResponse(res, "profil berhasil diupdate");
    } catch (error) {
      return errorResponse(res, error);
    }
  }

  async updateProfilePic(req: Request, res: Response) {
    try {
      const userId = req.user?.id as string;

      if (!req.file) {
        return errorResponse(res, new Error("file tidak ditemukan"));
      }

      const publicUrl = await this.userService.updateProfilePic(
        userId,
        req.file,
      );

      return successResponse(res, "foto profile berhasil diupdate", {
        img: publicUrl,
      });
    } catch (error) {
      return errorResponse(res, error);
    }
  }
}
