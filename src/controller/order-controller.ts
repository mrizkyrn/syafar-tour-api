import { NextFunction, Request, Response } from 'express';
import { OrderService } from '../service/order-service';
import { CreateOrderRequest } from '../model/order-model';
import { UserRequest } from '../type/user-request';

export class OrderController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateOrderRequest = req.body as CreateOrderRequest;
      const response = await OrderService.create(req.user, request);

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await OrderService.getAll();

      res.status(200).json({
        success: true,
        message: 'Orders retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await OrderService.get(id);

      res.status(200).json({
        success: true,
        message: 'Order retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
