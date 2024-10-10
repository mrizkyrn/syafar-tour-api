import { NextFunction, Request, Response } from 'express';
import { ProductOrderService } from '../service/product-order-service';
import { CreateProductOrderRequest, ProductOrderQueryParams } from '../model/product-order-model';
import { UserRequest } from '../type/user-request';

export class ProductOrderController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateProductOrderRequest = req.body as CreateProductOrderRequest;
      const response = await ProductOrderService.create(req.user, request);

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query: ProductOrderQueryParams = {
        search: req.query.search as string,
        sort: req.query.sort as string,
        order: req.query.order as 'asc' | 'desc',
        page: req.query.page ? Number(req.query.page as string) : 1,
        limit: req.query.limit ? Number(req.query.limit as string) : 10,
      }
      const response = await ProductOrderService.getAll(query);

      res.status(200).json({
        success: true,
        message: 'Orders retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllByUser(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await ProductOrderService.getAllByUser(req.user);

      res.status(200).json({
        success: true,
        message: 'Orders retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await ProductOrderService.delete(id);

      res.status(200).json({
        success: true,
        message: 'Order deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
