import { NextFunction, Request, Response } from 'express';
import { UserPackageOrderService } from '../service/user-package-order-service';
import { CreateUserPackageOrderRequest, UserPackageOrderQueryParams } from '../model/user-package-order-model';

export class UserPackageOrderController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserPackageOrderRequest = req.body as CreateUserPackageOrderRequest;
      const response = await UserPackageOrderService.create(request);

      res.status(200).json({
        success: true,
        message: 'Paket user berhasil dipesan',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query: UserPackageOrderQueryParams = {
        search: req.query.search as string,
        sort: req.query.sort as string,
        order: req.query.order as 'asc' | 'desc',
        page: req.query.page ? Number(req.query.page as string) : 1,
        limit: req.query.limit ? Number(req.query.limit as string) : 10,
      }
      const response = await UserPackageOrderService.getAll(query);

      res.status(200).json({
        success: true,
        message: 'Paket user berhasil didapatkan',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await UserPackageOrderService.delete(id);

      res.status(200).json({
        success: true,
        message: 'Paket user berhasil dihapus',
      });
    } catch (error) {
      next(error);
    }
  }
}
