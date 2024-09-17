import { NextFunction, Request, Response } from 'express';
import { CalculationService } from '../service/calculation-service';

export class CalculationController {
  static async create (req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body;
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
