import { NextFunction, Request, Response } from 'express';
import { CategoryService } from '../service/category-service';
import { CreateCategoryRequest, UpdateCategoryRequest } from '../model/category-model';

export class CategoryController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateCategoryRequest = req.body as CreateCategoryRequest;
      const response = await CategoryService.create(request);

      res.status(201).json({
        success: true,
        message: 'Category created successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CategoryService.getAll();

      res.status(200).json({
        success: true,
        message: 'Categories retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await CategoryService.get(id);

      res.status(200).json({
        success: true,
        message: 'Category retrieved successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const request: UpdateCategoryRequest = req.body as UpdateCategoryRequest;
      const response = await CategoryService.update(id, request);

      res.status(200).json({
        success: true,
        message: 'Category updated successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await CategoryService.delete(id);

      res.status(200).json({
        success: true,
        message: 'Category deleted successfully',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
