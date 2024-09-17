import { NextFunction, Request, Response } from 'express';
import { PriceService } from '../service/price-service';

export class PriceController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.params;
      const response = await PriceService.getAll(name);

      res.status(200).json({
        success: true,
        message: `${name} retrieved successfully`,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async bulkUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.params;
      const request = req.body;
      await PriceService.bulkUpdate(name, request);

      res.status(200).json({
        success: true,
        message: `${name} updated successfully`,
      });
    } catch (error) {
      next(error);
    }
  }
}
