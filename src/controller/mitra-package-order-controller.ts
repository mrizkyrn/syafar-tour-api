import { NextFunction, Request, Response } from 'express';
import { MitraPackageOrderService } from '../service/mitra-package-order-service';
import { CreateMitraPackageOrderRequest, MitraPackageOrderQueryParams } from '../model/mitra-package-order-service';
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

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query: MitraPackageOrderQueryParams = {
        search: req.query.search as string,
        sort: req.query.sort as string,
        order: req.query.order as 'asc' | 'desc',
        page: req.query.page ? Number(req.query.page as string) : 1,
        limit: req.query.limit ? Number(req.query.limit as string) : 10,
      }
      const result = await MitraPackageOrderService.getAll(query);

      res.status(200).json({
        success: true,
        message: 'Mitra package order list',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllByUser(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const result = await MitraPackageOrderService.getAllByUser(req.user);

      res.status(200).json({
        success: true,
        message: 'Mitra package order list',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await MitraPackageOrderService.get(id);

      res.status(200).json({
        success: true,
        message: 'Mitra package order retrieved successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await MitraPackageOrderService.delete(id);

      res.status(200).json({
        success: true,
        message: 'Mitra package order deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
