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
    });

    if (!response) {
      throw new ResponseError(404, 'User services not found');
    }

    return response.map((service) => toUserServiceResponse(service));
  }

  static async bulkUpdate(request: BulkUpdateRequest[]) {
    // console.log(request);
    const bulkUpdateRequest = request.map((service) => Validation.validate(UserServiceValidation.BULK_UPDATE, service));
    console.log('bulkUpdateRequest', bulkUpdateRequest);

    const response = await Promise.all(
      bulkUpdateRequest.map(async (service) => {
        const updatedService = await prismaClient.userService.update({
          where: {
            id: service.id,
          },
          data: {
            service_name: service.service_name,
            service_price: service.service_price,
          },
          include: {
            ServiceType: {
              select: {
                name: true,
              },
            },
          },
        });
      })
    );

    return response;
  }
}
