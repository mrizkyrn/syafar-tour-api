import { NextFunction, Request, Response } from 'express';
import { PackageTypeService } from '../service/package_type_service';

export class PackageTypeController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PackageTypeService.getAll();

      res.status(200).json({
        success: true,
        message: 'Package types retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

}
