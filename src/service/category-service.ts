import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { CategoryResponse, toCategoryResponse, CreateCategoryRequest } from '../model/category-model';
import { CategoryValidation } from '../validation/category-validation';
import { Validation } from '../validation/validation';

export class CategoryService {
  static async create(request: CreateCategoryRequest): Promise<CategoryResponse> {
    const createRequest = Validation.validate(CategoryValidation.CREATE, request);

    const reponse = await prismaClient.category.create({
      data: createRequest,
    });

    return toCategoryResponse(reponse);
  }

  static async getAll(): Promise<CategoryResponse[]> {
    const response = await prismaClient.category.findMany();

    return response.map((category) => toCategoryResponse(category));
  }

  static async get(id: string): Promise<CategoryResponse> {
    const response = await prismaClient.category.findUnique({
      where: { id },
    });

    if (!response) {
      throw new ResponseError(404, 'Category not found');
    }

    return toCategoryResponse(response);
  }

  static async update(id: string, request: CreateCategoryRequest): Promise<CategoryResponse> {
    const updateRequest = Validation.validate(CategoryValidation.CREATE, request);

    const response = await prismaClient.category.update({
      where: { id },
      data: updateRequest,
    });

    return toCategoryResponse(response);
  }

  static async delete(id: string): Promise<CategoryResponse> {
    const response = await prismaClient.category.delete({
      where: { id },
    });

    return toCategoryResponse(response);
  }
}
