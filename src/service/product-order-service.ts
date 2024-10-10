import { User } from '@prisma/client';
import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import {
  ProductOrderResponse,
  toProductOrderResponse,
  CreateProductOrderRequest,
  ProductOrderQueryParams,
} from '../model/product-order-model';
import { OrderValidation } from '../validation/product-order-validation';
import { Validation } from '../validation/validation';
import { Pageable } from '../model/page';

export class ProductOrderService {
  static async create(user: User, request: CreateProductOrderRequest): Promise<ProductOrderResponse> {
    const createRequest = Validation.validate(OrderValidation.CREATE, request);

    const response = await prismaClient.productOrder.create({
      data: {
        user_id: user.id,
        ...createRequest,
      },
    });

    return await this.get(response.id);
  }

  static async getAll(queryParams: ProductOrderQueryParams): Promise<Pageable<ProductOrderResponse>> {
    const queryRequest = Validation.validate(OrderValidation.QUERY, queryParams);

    const skip = (queryRequest.page - 1) * queryRequest.limit;
    let filter = {};

    if (queryRequest.search) {
      const searchTerm = queryRequest.search.toLowerCase();
      filter = {
        OR: [
          { User: { full_name: { contains: searchTerm } } },
          { User: { email: { contains: searchTerm } } },
          { User: { whatsapp_number: { contains: searchTerm } } },
        ],
      };
    }

    const sortField = queryRequest.sort || 'created_at';
    const sortOrder = queryRequest.order === 'asc' ? 'asc' : 'desc';

    const orderBy: { [key: string]: any } = {};
    if (sortField.startsWith('User.')) {
      const userField = sortField.split('.')[1];
      orderBy['User'] = { [userField]: sortOrder };
    } else {
      orderBy[sortField] = sortOrder;
    }

    const response = await prismaClient.productOrder.findMany({
      include: {
        User: true,
        Product: {
          select: {
            name: true,
          },
        },
        ProductVariation: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
      where: filter,
      orderBy,
      skip,
      take: queryRequest.limit,
    });

    const total = await prismaClient.productOrder.count({ where: filter });

    return {
      data: response.map((productOrder) => toProductOrderResponse(productOrder)),
      pagination: {
        total,
        current_page: queryRequest.page,
        total_pages: Math.ceil(total / queryRequest.limit),
        limit: queryRequest.limit,
      },
    };
  }

  static async getAllByUser(user: User): Promise<ProductOrderResponse[]> {
    const response = await prismaClient.productOrder.findMany({
      where: {
        user_id: user.id,
      },
      include: {
        User: true,
        Product: {
          select: {
            name: true,
          },
        },
        ProductVariation: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });

    return response.map((productOrder) => toProductOrderResponse(productOrder));
  }

  static async get(id: string): Promise<ProductOrderResponse> {
    const response = await prismaClient.productOrder.findUnique({
      where: {
        id,
      },
      include: {
        User: true,
        Product: {
          select: {
            name: true,
          },
        },
        ProductVariation: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });

    if (!response) {
      throw new ResponseError(404, 'Produk order tidak ditemukan');
    }

    return toProductOrderResponse(response);
  }

  static async delete(id: string): Promise<void> {
    const productOrder = await prismaClient.productOrder.findUnique({
      where: {
        id,
      },
    });

    if (!productOrder) {
      throw new ResponseError(404, 'Produk order tidak ditemukan');
    }

    await prismaClient.productOrder.delete({
      where: {
        id,
      },
    });
  }
}
