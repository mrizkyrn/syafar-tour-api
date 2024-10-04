import { NextFunction, Request, Response } from 'express';
import { PeriodService } from '../service/period-service';
import { CreatePeriodRequest, UpdatePeriodRequest } from '../model/period-model';

export class PeriodController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreatePeriodRequest = req.body as CreatePeriodRequest;
      const response = await PeriodService.create(request);

      res.status(201).json({
        success: true,
        message: 'Period created successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const request: UpdatePeriodRequest = req.body as UpdatePeriodRequest;
      const response = await PeriodService.update(id, request);

      res.status(200).json({
        success: true,
        message: 'Period updated successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await PeriodService.delete(id);

      res.status(200).json({
        success: true,
        message: 'Period deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await PeriodService.getById(id);

      res.status(200).json({
        success: true,
        message: 'Period retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PeriodService.getAll();

      res.status(200).json({
        success: true,
        message: 'Periods retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}