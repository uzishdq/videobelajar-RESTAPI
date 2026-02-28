import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";
import {
  loginSchema,
  registerSchema,
} from "../utils/validation/auth.validation";
import { errorResponse, successResponse } from "../utils/response.utils";

export class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    try {
      const parse = registerSchema.safeParse(req.body);

      if (!parse.success) {
        throw parse.error;
      }

      await this.authService.register(parse.data);

      return successResponse(
        res,
        "Terima kasih sudah mendaftar. Periksa email Anda dan klik tautan verifikasi untuk mengaktifkan akun.",
      );
    } catch (error) {
      return errorResponse(res, error);
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const { token } = req.query;

      await this.authService.verifyEmail(token as string);

      return successResponse(res, "email berhasil diverifikasi");
    } catch (error) {
      return errorResponse(res, error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const parse = loginSchema.safeParse(req.body);

      if (!parse.success) {
        throw parse.error;
      }

      const result = await this.authService.login(parse.data);

      return successResponse(res, "login berhasil", result);
    } catch (error) {
      return errorResponse(res, error);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      await this.authService.logout(refreshToken);

      return successResponse(res, "logout berhasil");
    } catch (error) {
      return errorResponse(res, error);
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      const accessToken = await this.authService.refreshToken(refreshToken);

      return successResponse(res, "refresh token berhasil", accessToken);
    } catch (error) {
      return errorResponse(res, error);
    }
  }
}
