import { NextFunction, Request, Response } from 'express';
import { MitraPackageOrderService } from '../service/mitra-package-order-service';
import { CreateMitraPackageOrderRequest } from '../model/mitra-package-order-service';
import { UserRequest } from '../type/user-request';

export class MitraPackageOrderController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateMitraPackageOrderRequest = req.body as CreateMitraPackageOrderRequest;
      await MitraPackageOrderService.create(req.user, request);

      res.status(201).json({
        success: true,
        message: 'Mitra package order created successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
