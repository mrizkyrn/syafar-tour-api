import { NextFunction, Request, Response } from 'express';
import { ExchangeRateService } from '../service/exchange-rate-service';
import { CreateExchangeRateRequest, BulkUpdateExchangeRateRequest } from '../model/exchange-rate-model';

export class ExchangeRateController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateExchangeRateRequest = req.body as CreateExchangeRateRequest;
      const response = await ExchangeRateService.create(request);

      res.status(201).json({
        success: true,
        message: 'Exchange rate created successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async bulkUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as BulkUpdateExchangeRateRequest[];
      await ExchangeRateService.bulkUpdate(request);

      res.status(200).json({
        success: true,
        message: 'Exchange rates updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await ExchangeRateService.delete(id);

      res.status(200).json({
        success: true,
        message: 'Exchange rate deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ExchangeRateService.getAll();

      res.status(200).json({
        success: true,
        message: 'Exchange rates retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await ExchangeRateService.get(id);

      res.status(200).json({
        success: true,
        message: 'Exchange rate retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
