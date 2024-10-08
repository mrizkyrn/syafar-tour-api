import { NextFunction, Request, Response } from 'express';
import { HotelService } from '../service/hotel-service';
import { BulkUpdateHotelRequest, CreateHotelRequest, HotelQueryParams, UpdateHotelRequest } from '../model/hotel-model';

export class HotelController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateHotelRequest = req.body as CreateHotelRequest;
      const response = await HotelService.create(request);

      res.status(201).json({
        success: true,
        message: 'Hotel created successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const request: UpdateHotelRequest = req.body as UpdateHotelRequest;
      // const response = await HotelService.update(id, request);

      res.status(200).json({
        success: true,
        message: 'Hotel updated successfully',
        // data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async bulkUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as BulkUpdateHotelRequest;
      const response = await HotelService.bulkUpdate(request);

      res.status(200).json({
        success: true,
        message: 'Hotels updated successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await HotelService.delete(id);

      res.status(200).json({
        success: true,
        message: 'Hotel deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await HotelService.getById(id);

      res.status(200).json({
        success: true,
        message: 'Hotel retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query: HotelQueryParams = {
        vendor_id: req.query.vendor_id as string,
        period_id: req.query.period_id as string,
        city: req.query.city as 'MEKKAH' | 'MADINAH',
      };
      const response = await HotelService.getAll(query);

      res.status(200).json({
        success: true,
        message: 'Hotels retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllHotelPeriodPrices(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await HotelService.getAllHotelPeriodPrices();

      res.status(200).json({
        success: true,
        message: 'Hotel period prices retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
