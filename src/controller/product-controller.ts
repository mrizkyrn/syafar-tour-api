import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../service/product-service';
import { CreateProductRequest, UpdateProductRequest } from '../model/product-model';

export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      let thumbnailPath = '/public/uploads/default-thumbnail.png';
      if (req.files && 'thumbnail' in req.files) {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const thumbnailFile = files['thumbnail'] ? files['thumbnail'][0] : null;
        const imageFiles = files['images'] || [];

        thumbnailPath = thumbnailFile ? `/public/uploads/${thumbnailFile.filename}` : thumbnailPath;
      }

      const variations = req.body.variations;
      if (variations) {
        variations.forEach((variation: any) => {
          variation.price = parseFloat(variation.price);
        });
      }

      const request: CreateProductRequest = {
        ...req.body,
        price: parseFloat(req.body.price),
        thumbnail: thumbnailPath,
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
    try {
      const id = req.params.id;

      if (req.files) {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        // Check if thumbnail exists before updating
        const thumbnailFile = files['thumbnail'] ? files['thumbnail'][0] : null;
        if (thumbnailFile) {
          req.body.thumbnail = `/public/uploads/${thumbnailFile.filename}`;
        }

        // Check if images exist before updating
        const imageFiles = files['images'] || [];
        if (imageFiles.length > 0) {
          req.body.images = imageFiles.map((file) => `/public/uploads/${file.filename}`);
        }
      }

      if (req.body.variations) {
        req.body.variations.forEach((variation: any) => {
          variation.price = parseFloat(variation.price);
        });
      }

      if (req.body.price) {
        req.body.price = parseFloat(req.body.price);
      }

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
