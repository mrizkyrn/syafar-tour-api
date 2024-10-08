import { NextFunction, Request, Response } from 'express';
import { ContactService } from '../service/contact-service';
import { CreateContactRequest, BulkUpdateContactRequest } from '../model/contact-model';

export class ContactController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateContactRequest = req.body as CreateContactRequest;
      const response = await ContactService.create(request);

      res.status(201).json({
        success: true,
        message: 'Contact created successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async bulkUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const request: BulkUpdateContactRequest[] = req.body as BulkUpdateContactRequest[];
      const response = await ContactService.bulkUpdate(request);

      res.status(200).json({
        success: true,
        message: 'Contact updated successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await ContactService.delete(id);

      res.status(200).json({
        success: true,
        message: 'Contact deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ContactService.getAll();

      res.status(200).json({
        success: true,
        message: 'Contacts retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getByName(req: Request, res: Response, next: NextFunction) {
    try {
      const name = req.query.name as string;
      const response = await ContactService.getByName(name);

      res.status(200).json({
        success: true,
        message: 'Contact retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}