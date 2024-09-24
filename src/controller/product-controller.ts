import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../service/product-service';
import { CreateProductRequest, UpdateProductRequest } from '../model/product-model';

export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files) {
        throw new Error('No files uploaded');
      }

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const thumbnailFile = files['thumbnail'] ? files['thumbnail'][0] : null;
      const imageFiles = files['images'] || [];

      const variations = req.body.variations;
      if (variations) {
        variations.forEach((variation: any) => {
          variation.price = parseFloat(variation.price);
        });
      }
      
      const request: CreateProductRequest = {
        ...req.body,
        price: parseFloat(req.body.price),
        thumbnail: thumbnailFile ? `/public/uploads/${thumbnailFile.filename}` : '',
        images: imageFiles.map((file) => `/public/uploads/${file.filename}`),
      };
      
      const response = await ProductService.create(request);

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ProductService.getAll();

      res.status(200).json({
        success: true,
        message: 'Products retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await ProductService.get(id);

      res.status(200).json({
        success: true,
        message: 'Product retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    try {
      const id = req.params.id;
      const request: UpdateProductRequest = req.body as UpdateProductRequest;
      const response = await ProductService.update(id, request);

      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await ProductService.delete(id);

      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
