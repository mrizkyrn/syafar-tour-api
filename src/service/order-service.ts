import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { OrderResponse, toOrderResponse, CreateOrderRequest } from '../model/order-model';
import { Validation } from '../validation/validation';
import { OrderValidation } from '../validation/order-validation';
import { User } from '@prisma/client';

export class OrderService {
  static async create(user: User, request: CreateOrderRequest): Promise<OrderResponse> {
    console.log(request);
    const createRequest = Validation.validate(OrderValidation.CREATE, request);

    const response = await prismaClient.order.create({
      data: {
        user_id: user.id,
        variation: createRequest.variation || '',
        ...createRequest,
      },
    });

    return await this.get(response.id);
  }

  static async getAll(): Promise<any[]> {
    // include user data only get full_name and include product data only get name
    const response = await prismaClient.order.findMany({
      include: {
        User: {
          select: {
            full_name: true,
            email: true,
            whatsapp_number: true,
          },
        },
        Product: {
          select: {
            name: true,
          },
        },
      },
    });

    return response;
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
