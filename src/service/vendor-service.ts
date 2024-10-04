import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { VendorResponse, toVendorResponse, CreateVendorRequest, UpdateVendorRequest } from '../model/vendor-model';
import { VendorValidation } from '../validation/vendor-validation';
import { Validation } from '../validation/validation';

export class VendorService {
  static async create(request: CreateVendorRequest): Promise<VendorResponse> {
    const createRequest = Validation.validate(VendorValidation.CREATE, request);

    const vendor = await prismaClient.vendor.create({
      data: {
        name: createRequest.name,
      },
    });

    return toVendorResponse(vendor);
  }

  static async update(id: string, request: UpdateVendorRequest): Promise<VendorResponse> {
    const updateRequest = Validation.validate(VendorValidation.UPDATE, request);

    await this.#checkVendorExist(id);

    const vendor = await prismaClient.vendor.update({
      where: { id },
      data: updateRequest,
    });

    return toVendorResponse(vendor);
  }

  static async delete(id: string): Promise<VendorResponse> {
    await this.#checkVendorExist(id);
    
    const vendor = await prismaClient.vendor.delete({
      where: { id },
    });

    if (!vendor) {
      throw new ResponseError(404, 'Vendor tidak ditemukan');
    }

    return toVendorResponse(vendor);
  }

  static async getById(id: string): Promise<VendorResponse> {
    const vendor = await prismaClient.vendor.findUnique({
      where: { id },
    });

    if (!vendor) {
      throw new ResponseError(404, 'Vendor tidak ditemukan');
    }

    return toVendorResponse(vendor);
  }

  static async getAll(): Promise<VendorResponse[]> {
    const vendors = await prismaClient.vendor.findMany();

    return vendors.map(toVendorResponse);
  }

  static async #checkVendorExist(id: string): Promise<void> {
    const vendor = await prismaClient.vendor.findUnique({
      where: { id },
    });

    if (!vendor) {
      throw new ResponseError(404, 'Vendor tidak ditemukan');
    }
  }
}
