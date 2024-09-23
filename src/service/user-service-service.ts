import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import {
  BulkUpdateRequest,
  GetByTypeRequest,
  toUserServiceResponse,
  UserServiceResponse,
} from '../model/user-service-model';
import { UserServiceValidation } from '../validation/user-service-validation';
import { Validation } from '../validation/validation';

export class UserServiceService {
  static async getAll(): Promise<UserServiceResponse[]> {
    const response = await prismaClient.userService.findMany({
      include: {
        ServiceType: {
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
      throw new ResponseError(404, 'User services not found');
    }

    return response.map((service) => toUserServiceResponse(service));
  }

  static async getByType(request: GetByTypeRequest): Promise<UserServiceResponse[]> {
    request.type = request.type.replace(/-/g, ' ');

    const serviceType = await prismaClient.serviceType.findUnique({
      where: {
        name: request.type,
      },
    });

    if (!serviceType) {
      throw new ResponseError(404, 'Service type not found');
    }

    const response = await prismaClient.userService.findMany({
      where: {
        service_type_id: serviceType.id,
      },
      include: {
        ServiceType: {
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
      throw new ResponseError(404, 'User services not found');
    }

    return response.map((service) => toUserServiceResponse(service));
  }

  static async bulkUpdate(request: BulkUpdateRequest) {
    const { type, modifiedData, deletedData } = request;
    const validatedModifiedData = modifiedData?.map((service) =>
      Validation.validate(UserServiceValidation.BULK_UPDATE, service)
    );

    console.log(type, validatedModifiedData, deletedData);

    const serviceType = await prismaClient.serviceType.findUnique({
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
            await prismaClient.userService.update({
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
            await prismaClient.userService.createMany({
              data: {
                name: service.name || '',
                price: service.price || 0,
                service_type_id: serviceType.id,
                order_number: service.order_number,
              },
            });
          }
        })
      );
    }

    // handle delete
    if (deletedData.length > 0) {
      await prismaClient.userService.deleteMany({
        where: {
          id: {
            in: deletedData,
          },
        },
      });
    }
  }
}
