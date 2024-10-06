import { prismaClient } from '../application/database';
import {
  MitraPackageOptionResponse,
  toMitraPackageOptionResponse,
  BulkUpdateMitraPackageOptionRequest,
} from '../model/mitra-package-option-model';
import { MitraPackageOptionValidation } from '../validation/mitra-package-option-validation';
import { Validation } from '../validation/validation';

async function bulkUpdate(model: any, request: BulkUpdateMitraPackageOptionRequest): Promise<void> {
  const { created, modified, deleted } = Validation.validate(MitraPackageOptionValidation.BULK_UPDATE, request);

  if (created && created.length > 0) {
    await model.createMany({
      data: created,
    });
  }

  if (modified && modified.length > 0) {
    await Promise.all(
      modified.map(async (option) => {
        await model.update({
          where: {
            id: option.id,
          },
          data: {
            name: option.name,
            price_idr: option.price_idr,
            order_number: option.order_number,
          },
        });
      })
    );
  }

  if (deleted && deleted.length > 0) {
    await model.deleteMany({
      where: {
        id: {
          in: deleted,
        },
      },
    });
  }
}

async function getAll(model: any): Promise<MitraPackageOptionResponse[]> {
  const items = await model.findMany({
    orderBy: {
      order_number: 'asc',
    },
  });
  return items.map(toMitraPackageOptionResponse);
}

export class MitraPackageOptionService {
  // Airline methods
  static async bulkUpdateAirlines(request: BulkUpdateMitraPackageOptionRequest): Promise<void> {
    await bulkUpdate(prismaClient.airline, request);
  }

  static async getAllAirlines(): Promise<MitraPackageOptionResponse[]> {
    return await getAll(prismaClient.airline);
  }

  // Visa methods
  static async bulkUpdateVisas(request: BulkUpdateMitraPackageOptionRequest): Promise<void> {
    await bulkUpdate(prismaClient.visa, request);
  }

  static async getAllVisas(): Promise<MitraPackageOptionResponse[]> {
    return await getAll(prismaClient.visa);
  }

  // Transportation methods
  static async bulkUpdateTransportations(request: BulkUpdateMitraPackageOptionRequest): Promise<void> {
    await bulkUpdate(prismaClient.transportation, request);
  }

  static async getAllTransportations(): Promise<MitraPackageOptionResponse[]> {
    return await getAll(prismaClient.transportation);
  }

  // Muthawif methods
  static async bulkUpdateMuthawifs(request: BulkUpdateMitraPackageOptionRequest): Promise<void> {
    await bulkUpdate(prismaClient.muthawif, request);
  }

  static async getAllMuthawifs(): Promise<MitraPackageOptionResponse[]> {
    return await getAll(prismaClient.muthawif);
  }

  // Handling saudi methods
  static async bulkUpdateHandlingSaudis(request: BulkUpdateMitraPackageOptionRequest): Promise<void> {
    await bulkUpdate(prismaClient.handlingSaudi, request);
  }

  static async getAllHandlingSaudis(): Promise<MitraPackageOptionResponse[]> {
    return await getAll(prismaClient.handlingSaudi);
  }

  // Hanlding domestic methods
  static async bulkUpdateHandlingDomestics(request: BulkUpdateMitraPackageOptionRequest): Promise<void> {
    await bulkUpdate(prismaClient.handlingDomestic, request);
  }

  static async getAllHandlingDomestics(): Promise<MitraPackageOptionResponse[]> {
    return await getAll(prismaClient.handlingDomestic);
  }

  // Siskopatuh methods
  static async bulkUpdateSiskopatuhs(request: BulkUpdateMitraPackageOptionRequest): Promise<void> {
    await bulkUpdate(prismaClient.siskopatuh, request);
  }

  static async getAllSiskopatuhs(): Promise<MitraPackageOptionResponse[]> {
    return await getAll(prismaClient.siskopatuh);
  }

  // Equipment methods
  static async bulkUpdateEquipments(request: BulkUpdateMitraPackageOptionRequest): Promise<void> {
    await bulkUpdate(prismaClient.equipment, request);
  }

  static async getAllEquipments(): Promise<MitraPackageOptionResponse[]> {
    return await getAll(prismaClient.equipment);
  }

  // Tour plus methods
  static async bulkUpdateTourPluses(request: BulkUpdateMitraPackageOptionRequest): Promise<void> {
    await bulkUpdate(prismaClient.tourPlus, request);
  }

  static async getAllTourPluses(): Promise<MitraPackageOptionResponse[]> {
    return await getAll(prismaClient.tourPlus);
  }

  // Manasik methods
  static async bulkUpdateManasiks(request: BulkUpdateMitraPackageOptionRequest): Promise<void> {
    await bulkUpdate(prismaClient.manasik, request);
  }

  static async getAllManasiks(): Promise<MitraPackageOptionResponse[]> {
    return await getAll(prismaClient.manasik);
  }
}
