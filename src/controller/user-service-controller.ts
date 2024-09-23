import { NextFunction, Request, Response } from 'express';
import { UserServiceService } from '../service/user-service-service';
import { BulkUpdateRequest } from '../model/user-service-model';

export class UserServiceController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserServiceService.getAll();
      
      res.status(200).json({
        success: true,
        message: 'User services retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getByType(req: Request, res: Response, next: NextFunction) {
    try {
      const request = {
        type: req.params.type,
      };
      const response = await UserServiceService.getByType(request);

      res.status(200).json({
        success: true,
        message: 'User services retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async bulkUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const request: BulkUpdateRequest = req.body as BulkUpdateRequest;
      await UserServiceService.bulkUpdate(request);

      res.status(200).json({
        success: true,
        message: 'User services updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
