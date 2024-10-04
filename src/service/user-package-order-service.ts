import { User } from '@prisma/client';
import { prismaClient } from '../application/database';
import { logger } from '../application/logger';
import { ResponseError } from '../error/response-error';
import {
  UserPackageOrderResponse,
  toUserPackageOrderResponse,
  CreateUserPackageOrderRequest,
  UserPackageOrderQueryParams,
} from '../model/user-package-order-model';
import { Validation } from '../validation/validation';
import { UserPackageOrderValidation } from '../validation/user-package-order-validation';
import { Pageable } from '../model/page';

export class UserPackageOrderService {
  static async create(request: CreateUserPackageOrderRequest): Promise<UserPackageOrderResponse> {
    const createRequest = Validation.validate(UserPackageOrderValidation.CREATE, request);

    const userPackage = await prismaClient.userPackage.findUnique({
      include: {
        flight: { select: { name: true } },
        transportation: { select: { name: true } },
        hotelMekkah: { select: { name: true } },
        hotelMadinah: { select: { name: true } },
        muthawif: { select: { name: true } },
        handling: { select: { name: true } },
      },
      where: { id: request.user_package_id },
    });

    if (!userPackage) {
      throw new ResponseError(404, 'User paket tidak ditemukan');
    }

    const userPackageOrder = await prismaClient.userPackageOrder.create({
      data: createRequest,
    });

    return toUserPackageOrderResponse(userPackageOrder, userPackage);
  }

  static async getAll(queryParams: UserPackageOrderQueryParams): Promise<Pageable<UserPackageOrderResponse>> {
    const queryRequest = Validation.validate(UserPackageOrderValidation.QUERY, queryParams);

    const skip = (queryRequest.page - 1) * queryRequest.limit;
    const filter = queryRequest.search
      ? {
          OR: [
            { full_name: { contains: queryRequest.search, mode: 'insensitive' } },
            { email: { contains: queryRequest.search, mode: 'insensitive' } },
            { whatsapp_number: { contains: queryRequest.search, mode: 'insensitive' } },
          ],
        }
      : {};

    const userPackageOrders = await prismaClient.userPackageOrder.findMany({
      include: {
        UserPackage: {
          include: {
            flight: { select: { name: true } },
            transportation: { select: { name: true } },
            hotelMekkah: { select: { name: true } },
            hotelMadinah: { select: { name: true } },
            muthawif: { select: { name: true } },
            handling: { select: { name: true } },
          },
        },
      },
      where: filter,
      orderBy: {
        [queryRequest.sort || 'created_at']: queryRequest.order || 'desc',
      },
      skip,
      take: queryRequest.limit,
    });

    if (!userPackageOrders) {
      throw new ResponseError(404, 'User package orders tidak ditemukan');
    }

    const total = await prismaClient.userPackageOrder.count({ where: filter });

    return {
      data: userPackageOrders.map((order) => toUserPackageOrderResponse(order, order.UserPackage)),
      pagination: {
        total,
        current_page: queryRequest.page,
        total_pages: Math.ceil(total / queryRequest.limit),
        limit: queryRequest.limit,
      },
    };
  }

  static async delete(id: string): Promise<void> {
    const userPackageOrder = await prismaClient.userPackageOrder.findUnique({ where: { id } });

    if (!userPackageOrder) {
      throw new ResponseError(404, 'User package order tidak ditemukan');
    }

    await prismaClient.userPackageOrder.delete({ where: { id } });
  }
}
