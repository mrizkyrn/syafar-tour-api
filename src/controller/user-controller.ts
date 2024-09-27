import { NextFunction, Request, Response } from 'express';
import { UserService } from '../service/user-service';
import { Role } from '@prisma/client';
import { UpdateUserRequest } from '../model/user-model';
import { UserRequest } from '../type/user-request';

export class UserController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserService.getAll();

      res.status(200).json({
        success: true,
        message: 'Users retrieved successfully',
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
        message: 'User retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getByRole(req: Request, res: Response, next: NextFunction) {
    try {
      const role = req.params.role as Role;
      const response = await UserService.getByRole(role);

      res.status(200).json({
        success: true,
        message: 'Users retrieved successfully',
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
        message: 'User retrieved successfully',
        data: req.user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCurrent(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      const response = await UserService.updateCurrent(req.user, request);

      res.cookie('access_token', response.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
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
        message: 'User deleted successfully',
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
        message: 'User upgraded to mitra successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
