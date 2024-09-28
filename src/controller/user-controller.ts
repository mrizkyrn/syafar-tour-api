import { NextFunction, Request, Response } from 'express';
import { Role } from '@prisma/client';
import { UpdateUserRequest, UpdatePasswordRequest, UserQueryParams, UpdateCurrentUserRequest } from '../model/user-model';
import { UserService } from '../service/user-service';
import { UserRequest } from '../type/user-request';

export class UserController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query: UserQueryParams = {
        full_name: req.query.full_name as string,
        email: req.query.email as string,
        whatsapp_number: req.query.whatsapp_number as string,
        role: req.query.role ? req.query.role as Role : undefined,
        sort: req.query.sort as string,
        order: req.query.order as 'asc' | 'desc',
        page: req.query.page ? Number(req.query.page as string) : 1,
        limit: req.query.limit ? Number(req.query.limit as string) : 10,
      }
      const response = await UserService.getAll(query);

      res.status(200).json({
        success: true,
        message: 'User berhasil didapatkan',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await UserService.get(id);

      res.status(200).json({
        success: true,
        message: 'User berhasil didapatkan',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCurrent(req: UserRequest, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        success: true,
        message: 'User berhasil didapatkan',
        data: req.user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCurrent(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateCurrentUserRequest = req.body as UpdateCurrentUserRequest;
      const response = await UserService.updateCurrent(req.user, request);

      res.cookie('access_token', response.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      res.status(200).json({
        success: true,
        message: 'User berhasil diupdate',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCurrentPassword(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request = req.body as UpdatePasswordRequest;
      await UserService.updateCurrentPassword(req.user, request);

      res.status(200).json({
        success: true,
        message: 'Password berhasil diupdate',
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      const response = await UserService.update(id, request);

      res.status(200).json({
        success: true,
        message: 'User berhasil diupdate',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await UserService.delete(id);

      res.status(200).json({
        success: true,
        message: 'User berhasil dihapus',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async upgradeToMitra(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await UserService.upgradeToMitra(id);

      res.cookie('access_token', response.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      res.status(200).json({
        success: true,
        message: 'User berhasil diupgrade menjadi mitra',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
