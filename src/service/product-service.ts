import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { ProductResponse, toProductResponse, CreateProductRequest, UpdateProductRequest } from '../model/product-model';
import { Validation } from '../validation/validation';
import { ProductValidation } from '../validation/product-validation';

export class ProductService {
  static async create(request: CreateProductRequest): Promise<ProductResponse> {
    const createRequest = Validation.validate(ProductValidation.CREATE, request);

    const response = await prismaClient.product.create({
      data: {
        name: createRequest.name,
        description: createRequest.description,
        price: createRequest.price,
        thumbnail: createRequest.thumbnail,
        ProductCategories: {
          create: createRequest.category_ids.map((category_id) => ({
            category_id,
          })),
        },
        ProductVariations: createRequest.variations ? { create: createRequest.variations } : undefined,
        ProductImages: createRequest.images
          ? {
              create: createRequest.images.map((image_url: string) => ({ image_url })),
            } 
          : undefined,
        ProductInclude: createRequest.includes
          ? {
              create: createRequest.includes.map((point) => ({ point })),
            }
          : undefined,
        ProductExclude: createRequest.excludes
          ? {
              create: createRequest.excludes.map((point) => ({ point })),
            }
          : undefined,
      },
    });

    return await this.get(response.id);
  }

  static async getAll(): Promise<any[]> {
    const response = await prismaClient.product.findMany({
      include: {
        ProductCategories: {
          select: {
            Category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        ProductVariations: true,
        ProductImages: true,
        ProductInclude: true,
        ProductExclude: true,
      },
    });

    return response.map((product) => toProductResponse(product));
  }

  static async get(id: string): Promise<ProductResponse> {
    const response = await prismaClient.product.findUnique({
      where: { id },
      include: {
        ProductCategories: {
          select: {
            Category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        ProductVariations: true,
        ProductImages: true,
        ProductInclude: true,
        ProductExclude: true,
      },
    });

    if (!response) {
      throw new ResponseError(404, 'Product not found');
    }

    return toProductResponse(response);
  }

  static async update(id: string, request: UpdateProductRequest): Promise<ProductResponse> {
    const updateRequest = Validation.validate(ProductValidation.UPDATE, request);

    const response = await prismaClient.product.update({
      where: { id },
      data: {
        thumbnail: updateRequest.thumbnail,
        name: updateRequest.name,
        description: updateRequest.description,
        price: updateRequest.price,
        ProductCategories: updateRequest.category_ids
          ? {
              deleteMany: {},
              create: updateRequest.category_ids.map((category_id) => ({
                category_id,
              })),
            }
          : undefined,
        ProductVariations: updateRequest.variations
          ? {
              deleteMany: {},
              create: updateRequest.variations,
            }
          : undefined,
        ProductImages: updateRequest.images
          ? {
              deleteMany: {},
              create: updateRequest.images.map((image_url: string) => ({ image_url })),
            }
          : undefined,
        ProductInclude: updateRequest.includes
          ? {
              deleteMany: {},
              create: updateRequest.includes.map((point) => ({ point })),
            }
          : undefined,
        ProductExclude: updateRequest.excludes
          ? {
              deleteMany: {},
              create: updateRequest.excludes.map((point) => ({ point })),
            }
          : undefined,
      },
    });

    if (!response) {
      throw new ResponseError(404, 'Product not found');
    }

    return toProductResponse(response);
  }

  static async delete(id: string): Promise<void> {
    const response = await prismaClient.product.delete({
      where: { id },
    });

    if (!response) {
      throw new ResponseError(404, 'Product not found');
    }
  }
}
