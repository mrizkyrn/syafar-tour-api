import { User } from '@prisma/client';
import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { ProductOrderResponse, toProductOrderResponse, CreateProductOrderRequest } from '../model/product-order-model';
import { OrderValidation } from '../validation/product-order-validation';
import { Validation } from '../validation/validation';

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

  static async getAll(): Promise<ProductOrderResponse[]> {
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
