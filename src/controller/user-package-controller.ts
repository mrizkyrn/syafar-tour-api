import { NextFunction, Request, Response } from 'express';
import { CreateUserPackageRequest } from '../model/user-package-model';
import { UserPackageService } from '../service/user-package-service';

export class UserPackageController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserPackageRequest = req.body as CreateUserPackageRequest;
      const response = await UserPackageService.create(request);

      res.status(200).json({
        success: true,
        message: 'User package created successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await UserPackageService.get(id);

      res.status(200).json({
        success: true,
        message: 'User package retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
