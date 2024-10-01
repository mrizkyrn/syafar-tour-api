import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../service/product-service';
import { CreateProductRequest, ProductQueryParams, UpdateProductRequest } from '../model/product-model';

export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      let thumbnails: string[] = [];

      if (req.files && 'thumbnails' in req.files) {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        thumbnails = files['thumbnails'].map((file) => `/public/upload/thumbnail/${file.filename}`);
      }

      if (thumbnails.length === 0) {
        thumbnails.push('/public/upload/default-thumbnail.png');
      }

      const variations = req.body.variations;
      if (variations) {
        variations.forEach((variation: any) => {
          variation.price = parseFloat(variation.price);
        });
      }

      const request: CreateProductRequest = {
        name: req.body.name,
        description: req.body.description,
        price: parseFloat(req.body.price),
        has_variation: req.body.has_variation === 'true',
        thumbnails: thumbnails,
        category_ids: req.body.category_ids,
        variations: variations,
        includes: req.body.includes,
        excludes: req.body.excludes,
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
      const query: ProductQueryParams = {
        name: req.query.name as string,
        category_id: req.query.category_id ? (req.query.category_id as string).split(',') : [],
        has_variation: req.query.has_variation ? req.query.has_variation === 'true' : undefined,
        sort: req.query.sort as string,
        order: req.query.order as 'asc' | 'desc',
        page: req.query.page ? Number(req.query.page as string) : 1,
        limit: req.query.limit ? Number(req.query.limit as string) : 10,
      };
      console.log(query);
      const response = await ProductService.getAll(query);

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

      let newThumbnails: string[] = [];
      let newVariations: any[] = [];

      if (req.files && 'thumbnails' in req.files) {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        newThumbnails = files['thumbnails'].map((file) => `/public/upload/thumbnail/${file.filename}`);
      }

      if (req.body.variations) {
        newVariations = req.body.variations;
        newVariations.forEach((variation: any) => {
          variation.price = parseFloat(variation.price);
        });
      }

      if (req.body.price) {
        req.body.price = parseFloat(req.body.price);
      }

      const request: UpdateProductRequest = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        has_variation: req.body.has_variation === 'true',
        thumbnails: newThumbnails,
        category_ids: req.body.category_ids,
        variations: newVariations,
        includes: req.body.includes,
        excludes: req.body.excludes,
      };
      console.log(request);

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
