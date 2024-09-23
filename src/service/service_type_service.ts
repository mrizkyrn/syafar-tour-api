import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { ServiceTypeResponse, toServiceTypeResponse } from '../model/service-type-model';

export class ServiceTypeService {
  static async getAll(): Promise<ServiceTypeResponse[]> {
    const response = await prismaClient.serviceType.findMany();

    if (!response) {
      throw new ResponseError(404, 'Service types not found');
    }

    return response.map((service) => toServiceTypeResponse(service));
  }
}
