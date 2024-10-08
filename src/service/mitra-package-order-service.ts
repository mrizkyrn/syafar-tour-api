import { User } from '@prisma/client';
import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import {
  CreateMitraPackageOrderRequest,
} from '../model/mitra-package-order-service';
import { MitraPackageValidation } from '../validation/mitra-package-order-validation';
import { Validation } from '../validation/validation';

export class MitraPackageOrderService {
  static async create(user: User, request: CreateMitraPackageOrderRequest): Promise<void> {
    console.log(user, request);
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
}
