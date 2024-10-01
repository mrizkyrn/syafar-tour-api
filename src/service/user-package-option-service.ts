import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { UserPackageOptionValidation } from '../validation/user-package-option-validation';
import { Validation } from '../validation/validation';
import {
  UserPackageOptionResponse,
  toUserPackageOptionResponse,
  BulkUpdateRequest,
} from '../model/user-package-option-model';

export class UserPackageOptionService {
  static async getAll(): Promise<UserPackageOptionResponse[]> {
    const response = await prismaClient.userPackageOption.findMany({
      include: {
        PackageType: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        order_number: 'asc',
      },
    });

    if (!response) {
      throw new ResponseError(404, 'User package options tidak ditemukan');
    }

    return response.map((option) => toUserPackageOptionResponse(option));
  }

  static async getByType(type: string): Promise<UserPackageOptionResponse[]> {
    type = type.replace(/-/g, ' ');

    const packageType = await prismaClient.packageType.findFirst({
      where: {
        name: type,
      },
    });

    if (!packageType) {
      throw new ResponseError(404, 'Package type tidak ditemukan');
    }

    const response = await prismaClient.userPackageOption.findMany({
      where: {
        package_type_id: packageType.id,
      },
      include: {
        PackageType: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        order_number: 'asc',
      },
    });

    return response.map((option) => toUserPackageOptionResponse(option));
  }

  static async bulkUpdate(request: BulkUpdateRequest): Promise<void> {
    const { type, modifiedData, deletedData } = request;
    const validatedModifiedData = modifiedData?.map((service) =>
      Validation.validate(UserPackageOptionValidation.BULK_UPDATE, service)
    );

    const serviceType = await prismaClient.packageType.findFirst({
      where: {
        name: type.replace(/-/g, ' '),
      },
    });

    if (!serviceType) {
      throw new ResponseError(404, 'Service type not found');
    }

    // handle update and create
    if (validatedModifiedData.length > 0) {
      await Promise.all(
        validatedModifiedData.map(async (service) => {
          if (service.id) {
            await prismaClient.userPackageOption.update({
              where: {
                id: service.id,
              },
              data: {
                name: service.name,
                price: service.price,
                order_number: service.order_number,
              },
            });
          } else {
            await prismaClient.userPackageOption.createMany({
              data: {
                name: service.name || '',
                price: service.price || 0,
                package_type_id: serviceType.id,
                order_number: service.order_number,
              },
            });
          }
        })
      );
    }

    // handle delete
    if (deletedData.length > 0) {
      await prismaClient.userPackageOption.deleteMany({
        where: {
          id: {
            in: deletedData,
          },
        },
      });
    }
  }
}
