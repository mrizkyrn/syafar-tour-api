import { NextFunction, Request, Response } from 'express';
import { ServiceTypeService } from '../service/service_type_service';

export class ServiceTypeController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ServiceTypeService.getAll();

      res.status(200).json({
        success: true,
        message: 'Service types retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

}
