import { NextFunction, Request, Response } from 'express';
import { UserPackageOptionService } from '../service/user-package-option-service';

export class UserPackageOptionController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserPackageOptionService.getAll();

      res.status(200).json({
        success: true,
        message: 'Paket user berhasil didapatkan',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getByType(req: Request, res: Response, next: NextFunction) {
    try {
      const { type } = req.params;
      const response = await UserPackageOptionService.getByType(type);

      res.status(200).json({
        success: true,
        message: 'Paket user berhasil didapatkan',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async bulkUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body;
      await UserPackageOptionService.bulkUpdate(request);

      res.status(200).json({
        success: true,
        message: 'Paket user berhasil diupdate',
      });
    } catch (error) {
      next(error);
    }
  }
}
