import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { OrderResponse, toOrderResponse, CreateOrderRequest } from '../model/order-model';
import { Validation } from '../validation/validation';
import { OrderValidation } from '../validation/order-validation';
import { User } from '@prisma/client';

export class OrderService {
  static async create(user: User, request: CreateOrderRequest): Promise<OrderResponse> {
    const createRequest = Validation.validate(OrderValidation.CREATE, request);

    const response = await prismaClient.order.create({
      data: {
        user_id: user.id,
        ...createRequest,
        },
      });

    return await this.get(response.id);
  }

  static async getAll(): Promise<OrderResponse[]> {
    const response = await prismaClient.order.findMany();

    return response.map((order) => toOrderResponse(order));
  }

  static async get(id: string): Promise<OrderResponse> {
    const response = await prismaClient.order.findUnique({
      where: { id },
    });

    if (!response) {
      throw new ResponseError(404, 'Order not found');
    }

    return toOrderResponse(response);
  }
}
