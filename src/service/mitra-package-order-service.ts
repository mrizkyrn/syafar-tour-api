import { User } from '@prisma/client';
import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import {
  CreateMitraPackageOrderRequest,
  MitraPackageOrderQueryParams,
  MitraPackageOrderResponse,
  toMitraPackageOrderResponse,
} from '../model/mitra-package-order-service';
import { MitraPackageValidation } from '../validation/mitra-package-order-validation';
import { Validation } from '../validation/validation';
import { Pageable } from '../model/page';

export class MitraPackageOrderService {
  static async create(user: User, request: CreateMitraPackageOrderRequest): Promise<void> {
    const createRequest = Validation.validate(MitraPackageValidation.CREATE, request);

    const mitraPackage = await prismaClient.mitraPackage.findUnique({
      where: { id: createRequest.mitra_package_id },
    });

    if (!mitraPackage) {
      throw new ResponseError(404, 'Mitra package not found');
    }

    await prismaClient.mitraPackageOrder.create({
      data: {
        ...createRequest,
        user_id: user.id,
      },
    });
  }

  static async getAll(queryParams: MitraPackageOrderQueryParams): Promise<Pageable<MitraPackageOrderResponse>> {
    const queryRequest = Validation.validate(MitraPackageValidation.QUERY, queryParams);
    
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

    const validSortFields = [
      'User.email',
      'User.full_name',
      'User.whatsapp_number',
      'MitraPackage.per_pax_price',
      'MitraPackage.total_price',
      'created_at',
      'updated_at',
    ];

    if (!validSortFields.includes(sortField)) {
      throw new Error(`Invalid sort field: ${sortField}. Valid options are: ${validSortFields.join(', ')}`);
    }

    const orderBy: { [key: string]: any } = {};
    if (sortField.startsWith('User.')) {
      const userField = sortField.split('.')[1];
      orderBy['User'] = { [userField]: sortOrder };
    } else if (sortField.startsWith('MitraPackage.')) {
      const mitraPackageField = sortField.split('.')[1];
      orderBy['MitraPackage'] = { [mitraPackageField]: sortOrder };
    } else {
      orderBy[sortField] = sortOrder;
    }

    const mitraPackageOrders = await prismaClient.mitraPackageOrder.findMany({
      include: {
        User: true,
        MitraPackage: { select: { per_pax_price: true, total_price: true } },
      },
      where: filter,
      orderBy,
      skip,
      take: queryRequest.limit,
    });

    const total = await prismaClient.mitraPackageOrder.count({ where: filter });

    return {
      data: mitraPackageOrders.map((order) => toMitraPackageOrderResponse(order)),
      pagination: {
        total,
        current_page: queryRequest.page,
        total_pages: Math.ceil(total / queryRequest.limit),
        limit: queryRequest.limit,
      },
    };
  }

  static async getAllByUser(user: User): Promise<MitraPackageOrderResponse[]> {
    const mitraPackageOrders = await prismaClient.mitraPackageOrder.findMany({
      where: { user_id: user.id },
      include: {
        User: true,
        MitraPackage: { select: { per_pax_price: true, total_price: true } },
      },
    });

    return mitraPackageOrders.map((order) => toMitraPackageOrderResponse(order));
  }

  static async get(id: string): Promise<MitraPackageOrderResponse> {
    const mitraPackageOrder = await prismaClient.mitraPackageOrder.findUnique({
      where: { id },
      include: {
        User: true,
        MitraPackage: { select: { per_pax_price: true, total_price: true } },
      },
    });

    if (!mitraPackageOrder) {
      throw new ResponseError(404, 'Mitra package order not found');
    }

    return toMitraPackageOrderResponse(mitraPackageOrder);
  }

  static async delete(id: string): Promise<void> {
    const mitraPackageOrder = await prismaClient.mitraPackageOrder.findUnique({ where: { id } });

    if (!mitraPackageOrder) {
      throw new ResponseError(404, 'Mitra package order not found');
    }

    await prismaClient.mitraPackageOrder.delete({ where: { id } });
  }
}
