import { NextFunction, Request, Response } from 'express';
import { MitraPackageOptionService } from '../service/mitra-package-option-service';
import { BulkUpdateMitraPackageOptionRequest } from '../model/mitra-package-option-model';

export class MitraPackageOptionController {
  static async bulkUpdateAirline(req: Request, res: Response, next: NextFunction) {
    try {
      const request: BulkUpdateMitraPackageOptionRequest = req.body as BulkUpdateMitraPackageOptionRequest;
      await MitraPackageOptionService.bulkUpdateAirlines(request);

      res.status(200).json({
        success: true,
        message: 'Maskapai penerbangan berhasil diupdate',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllAirlines(req: Request, res: Response, next: NextFunction) {
    try {
      const airlines = await MitraPackageOptionService.getAllAirlines();

      res.status(200).json({
        success: true,
        message: 'Maskapai penerbangan berhasil diambil',
        data: airlines,
      });
    } catch (error) {
      next(error);
    }
  }

  static async bulkUpdateVisas(req: Request, res: Response, next: NextFunction) {
    try {
      const request: BulkUpdateMitraPackageOptionRequest = req.body as BulkUpdateMitraPackageOptionRequest;
      await MitraPackageOptionService.bulkUpdateVisas(request);

      res.status(200).json({
        success: true,
        message: 'Visa berhasil diupdate',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllVisas(req: Request, res: Response, next: NextFunction) {
    try {
      const visas = await MitraPackageOptionService.getAllVisas();

      res.status(200).json({
        success: true,
        message: 'Visa berhasil diambil',
        data: visas,
      });
    } catch (error) {
      next(error);
    }
  }

  static async bulkUpdateTranportations(req: Request, res: Response, next: NextFunction) {
    try {
      const request: BulkUpdateMitraPackageOptionRequest = req.body as BulkUpdateMitraPackageOptionRequest;
      await MitraPackageOptionService.bulkUpdateTransportations(request);

      res.status(200).json({
        success: true,
        message: 'Transportasi berhasil diupdate',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllTransportations(req: Request, res: Response, next: NextFunction) {
    try {
      const transportation = await MitraPackageOptionService.getAllTransportations();

      res.status(200).json({
        success: true,
        message: 'Transportasi berhasil diambil',
        data: transportation,
      });
    } catch (error) {
      next(error);
    }
  }

  static async bulkUpdateMuthawifs(req: Request, res: Response, next: NextFunction) {
    try {
      const request: BulkUpdateMitraPackageOptionRequest = req.body as BulkUpdateMitraPackageOptionRequest;
      await MitraPackageOptionService.bulkUpdateMuthawifs(request);

      res.status(200).json({
        success: true,
        message: 'Muthawif berhasil diupdate',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllMuthawifs(req: Request, res: Response, next: NextFunction) {
    try {
      const muthawif = await MitraPackageOptionService.getAllMuthawifs();

      res.status(200).json({
        success: true,
        message: 'Muthawif berhasil diambil',
        data: muthawif,
      });
    } catch (error) {
      next(error);
    }
  }

  static async bulkUpdateHandlingSaudis(req: Request, res: Response, next: NextFunction) {
    try {
      const request: BulkUpdateMitraPackageOptionRequest = req.body as BulkUpdateMitraPackageOptionRequest;
      await MitraPackageOptionService.bulkUpdateHandlingSaudis(request);

      res.status(200).json({
        success: true,
        message: 'Handling Saudi berhasil diupdate',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllHandlingSaudis(req: Request, res: Response, next: NextFunction) {
    try {
      const handlingSaudi = await MitraPackageOptionService.getAllHandlingSaudis();

      res.status(200).json({
        success: true,
        message: 'Handling Saudi berhasil diambil',
        data: handlingSaudi,
      });
    } catch (error) {
      next(error);
    }
  }

  static async bulkUpdateHandlingDomestics(req: Request, res: Response, next: NextFunction) {
    try {
      const request: BulkUpdateMitraPackageOptionRequest = req.body as BulkUpdateMitraPackageOptionRequest;
      await MitraPackageOptionService.bulkUpdateHandlingDomestics(request);

      res.status(200).json({
        success: true,
        message: 'Handling domestik berhasil diupdate',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllHandlingDomestics(req: Request, res: Response, next: NextFunction) {
    try {
      const handlingDomestic = await MitraPackageOptionService.getAllHandlingDomestics();

      res.status(200).json({
        success: true,
        message: 'Handling domestik berhasil diambil',
        data: handlingDomestic,
      });
    } catch (error) {
      next(error);
    }
  }

  static async bulkUpdateSiskopatuh(req: Request, res: Response, next: NextFunction) {
    try {
      const request: BulkUpdateMitraPackageOptionRequest = req.body as BulkUpdateMitraPackageOptionRequest;
      await MitraPackageOptionService.bulkUpdateSiskopatuhs(request);

      res.status(200).json({
        success: true,
        message: 'Siskopatuh berhasil diupdate',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllSiskopatuh(req: Request, res: Response, next: NextFunction) {
    try {
      const siskopatuh = await MitraPackageOptionService.getAllSiskopatuhs();

      res.status(200).json({
        success: true,
        message: 'Siskopatuh berhasil diambil',
        data: siskopatuh,
      });
    } catch (error) {
      next(error);
    }
  }

  static async bulkUpdateEquipments(req: Request, res: Response, next: NextFunction) {
    try {
      const request: BulkUpdateMitraPackageOptionRequest = req.body as BulkUpdateMitraPackageOptionRequest;
      await MitraPackageOptionService.bulkUpdateEquipments(request);

      res.status(200).json({
        success: true,
        message: 'Perlengkapan berhasil diupdate',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllEquipments(req: Request, res: Response, next: NextFunction) {
    try {
      const equipment = await MitraPackageOptionService.getAllEquipments();

      res.status(200).json({
        success: true,
        message: 'Perlengkapan berhasil diambil',
        data: equipment,
      });
    } catch (error) {
      next(error);
    }
  }

  static async bulkUpdateTourPluses(req: Request, res: Response, next: NextFunction) {
    try {
      const request: BulkUpdateMitraPackageOptionRequest = req.body as BulkUpdateMitraPackageOptionRequest;
      await MitraPackageOptionService.bulkUpdateTourPluses(request);

      res.status(200).json({
        success: true,
        message: 'Tour plus berhasil diupdate',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllTourPluses(req: Request, res: Response, next: NextFunction) {
    try {
      const tourPlus = await MitraPackageOptionService.getAllTourPluses();

      res.status(200).json({
        success: true,
        message: 'Tour plus berhasil diambil',
        data: tourPlus,
      });
    } catch (error) {
      next(error);
    }
  }

  static async bulkUpdateManasik(req: Request, res: Response, next: NextFunction) {
    try {
      const request: BulkUpdateMitraPackageOptionRequest = req.body as BulkUpdateMitraPackageOptionRequest;
      await MitraPackageOptionService.bulkUpdateManasiks(request);

      res.status(200).json({
        success: true,
        message: 'Manasik berhasil diupdate',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllManasik(req: Request, res: Response, next: NextFunction) {
    try {
      const manasik = await MitraPackageOptionService.getAllManasiks();

      res.status(200).json({
        success: true,
        message: 'Manasik berhasil diambil',
        data: manasik,
      });
    } catch (error) {
      next(error);
    }
  }
}
