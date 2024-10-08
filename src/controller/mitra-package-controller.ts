import { NextFunction, Request, Response } from 'express';
import { MitraPackageService } from '../service/mitra-package-service';
import { CreateMitraPackageRequest } from '../model/mitra-package-model';

export class MitraPackageController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateMitraPackageRequest = req.body as CreateMitraPackageRequest;
      const response = await MitraPackageService.create(request);

      res.status(201).json({
        success: true,
        message: 'Mitra package created successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await MitraPackageService.get(id);

      res.status(200).json({
        success: true,
        message: 'Mitra package retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}