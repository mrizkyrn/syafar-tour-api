import { NextFunction, Request, Response } from 'express';
import { VendorService } from '../service/vendor-service';
import { CreateVendorRequest, UpdateVendorRequest } from '../model/vendor-model';

export class VendorController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateVendorRequest = req.body as CreateVendorRequest;
      const response = await VendorService.create(request);

      res.status(201).json({
        success: true,
        message: 'Vendor created successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const request: UpdateVendorRequest = req.body as UpdateVendorRequest;
      const response = await VendorService.update(id, request);

      res.status(200).json({
        success: true,
        message: 'Vendor updated successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await VendorService.delete(id);

      res.status(200).json({
        success: true,
        message: 'Vendor deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await VendorService.getById(id);

      res.status(200).json({
        success: true,
        message: 'Vendor retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await VendorService.getAll();

      res.status(200).json({
        success: true,
        message: 'Vendors retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}