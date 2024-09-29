import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { PackageTypeResponse, toPackageTypeResponse } from '../model/package-type-model';

export class PackageTypeService {
  static async getAll(): Promise<PackageTypeResponse[]> {
    const response = await prismaClient.packageType.findMany();

    if (!response) {
      throw new ResponseError(404, 'Package types not found');
    }

    return response.map((type) => toPackageTypeResponse(type));
  }
}
