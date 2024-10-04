import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { Pageable } from '../model/page';
import {
  ProductResponse,
  toProductResponse,
  CreateProductRequest,
  UpdateProductRequest,
  ProductQueryParams,
} from '../model/product-model';
import { ProductValidation } from '../validation/product-validation';
import { Validation } from '../validation/validation';

export class ProductService {
  static async create(request: CreateProductRequest): Promise<ProductResponse> {
    const createRequest = Validation.validate(ProductValidation.CREATE, request);

    const product = await prismaClient.product.create({
      data: {
        name: createRequest.name,
        description: createRequest.description,
        price: createRequest.price,
        has_variation: createRequest.has_variation,
      },
    });

    if (createRequest.thumbnails) {
      await prismaClient.productThumbnail.createMany({
        data: createRequest.thumbnails.map((image_url) => ({
          product_id: product.id,
          image_url,
        })),
      });
    }

    if (createRequest.category_ids) {
      await prismaClient.productCategory.createMany({
        data: createRequest.category_ids.map((category_id) => ({
          product_id: product.id,
          category_id,
        })),
      });
    }

    if (createRequest.variations) {
      await prismaClient.productVariation.createMany({
        data: createRequest.variations.map((variation) => ({
          product_id: product.id,
          name: variation.name,
          price: variation.price,
        })),
      });
    }

    if (createRequest.includes) {
      await prismaClient.productInclude.createMany({
        data: createRequest.includes.map((include) => ({
          product_id: product.id,
          description: include,
        })),
      });
    }

    if (createRequest.excludes) {
      await prismaClient.productExclude.createMany({
        data: createRequest.excludes.map((exclude) => ({
          product_id: product.id,
          description: exclude,
        })),
      });
    }

    return await this.get(product.id);
  }

  static async getAll(queryParams: ProductQueryParams): Promise<Pageable<ProductResponse>> {
    const queryRequest = Validation.validate(ProductValidation.QUERY, queryParams);

    const skip = (queryRequest.page - 1) * queryRequest.limit;
    const filter = [];

    if (queryRequest.name) {
      filter.push({
        name: { contains: queryRequest.name },
      });
    }

    if (queryRequest.has_variation !== undefined) {
      filter.push({
        has_variation: queryRequest.has_variation,
      });
    }

    if (queryRequest.category_id?.length) {
      filter.push({
        ProductCategories: {
          some: {
            category_id: {
              in: queryRequest.category_id,
            },
          },
        },
      });
    }

    const products = await prismaClient.product.findMany({
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
        ProductThumbnails: true,
        ProductVariations: true,
        ProductIncludes: true,
        ProductExcludes: true,
      },
      where: {
        AND: filter,
      },
      orderBy: {
        [queryRequest.sort || 'created_at']: queryRequest.order || 'desc',
      },
      skip,
      take: queryRequest.limit,
    });

    const total = await prismaClient.product.count({ where: { AND: filter } });

    return {
      data: products.map((product) => toProductResponse(product)),
      pagination: {
        total,
        current_page: queryRequest.page,
        total_pages: Math.ceil(total / queryRequest.limit),
        limit: queryRequest.limit,
      },
    };
  }

  static async get(id: string): Promise<ProductResponse> {
    const response = await prismaClient.product.findUnique({
      where: { id },
      include: {
        ProductThumbnails: true,
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
        ProductIncludes: true,
        ProductExcludes: true,
      },
    });

    if (!response) {
      throw new ResponseError(404, 'Produk tidak ditemukan');
    }

    return toProductResponse(response);
  }

  static async update(id: string, request: UpdateProductRequest): Promise<ProductResponse> {
    const updateRequest = Validation.validate(ProductValidation.UPDATE, request);
    const response = await prismaClient.product.update({
      where: { id },
      data: {
        name: updateRequest.name,
        description: updateRequest.description,
        price: updateRequest.price,
        has_variation: updateRequest.has_variation,
        ProductThumbnails:
          (updateRequest.thumbnails ?? []).length > 0
            ? {
                deleteMany: {},
                create: (updateRequest.thumbnails ?? []).map((url) => ({ image_url: url })),
              }
            : undefined,
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
        ProductIncludes: updateRequest.includes
          ? {
              deleteMany: {},
              create: updateRequest.includes.map((description) => ({ description })),
            }
          : undefined,
        ProductExcludes: updateRequest.excludes
          ? {
              deleteMany: {},
              create: updateRequest.excludes.map((description) => ({ description })),
            }
          : undefined,
      },
      include: {
        ProductThumbnails: true,
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
        ProductIncludes: true,
        ProductExcludes: true,
      },
    });

    if (!response) {
      throw new ResponseError(404, 'Produk tidak ditemukan');
    }

    return toProductResponse(response);
  }

  static async delete(id: string): Promise<void> {
    const response = await prismaClient.product.delete({
      where: { id },
    });

    if (!response) {
      throw new ResponseError(404, 'Produk tidak ditemukan');
    }
  }
}
