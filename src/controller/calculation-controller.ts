import { NextFunction, Request, Response } from 'express';
import { CalculationService } from '../service/calculation-service';
import { CreateCalculationRequest } from '../model/calculation-model';

export class CalculationController {
  static async create (req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    try {
      const request: CreateCalculationRequest = req.body as CreateCalculationRequest;
      const response = await CalculationService.create(request);

      res.status(200).json({
        success: true,
        message: 'Total calculated successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await CalculationService.get(id);

      res.status(200).json({
        success: true,
        message: 'Calculation retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
