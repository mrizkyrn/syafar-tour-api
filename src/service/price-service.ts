import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';

export class PriceService {
  static async getAll(name: string) {
    switch (name) {
      case 'flight':
        return prismaClient.flight.findMany();
      case 'hotel-mekkah':
        return prismaClient.hotelMekkah.findMany();
      case 'hotel-maddinah':
        return prismaClient.hotelMaddinah.findMany();
      case 'transportation':
        return prismaClient.transportation.findMany();
      case 'muthawwif':
        return prismaClient.muthawwif.findMany();
      case 'handling':
        return prismaClient.handling.findMany();
      default:
        throw new ResponseError(400, 'Invalid name');
    }
  }

  static async bulkUpdate(name: string, request: any) {
    console.log(request, name);
    switch (name) {
      case 'flight':
        for (const flight of request) {
          await prismaClient.flight.update({
            where: { id: flight.id },
            data: {
              name: flight.name,
              price: flight.price,
            },
          });
        }
        break;
      case 'hotel-mekkah':
        for (const hotelMekkah of request) {
          await prismaClient.hotelMekkah.update({
            where: { id: hotelMekkah.id },
            data: {
              name: hotelMekkah.name,
              price: hotelMekkah.price,
            },
          });
        }
        break;
      case 'hotel-maddinah':
        for (const hotelMaddinah of request) {
          await prismaClient.hotelMaddinah.update({
            where: { id: hotelMaddinah.id },
            data: {
              name: hotelMaddinah.name,
              price: hotelMaddinah.price,
            },
          });
        }
        break;
      case 'transportation':
        for (const transportation of request) {
          await prismaClient.transportation.update({
            where: { id: transportation.id },
            data: {
              name: transportation.name,
              price: transportation.price,
            },
          });
        }
        break;
      case 'muthawwif':
        console.log('HERE');
        for (const muthawwif of request) {
          await prismaClient.muthawwif.update({
            where: { id: muthawwif.id },
            data: {
              name: muthawwif.name,
              price: muthawwif.price,
            },
          });
        }
        break;
      case 'handling':
        for (const handling of request) {
          await prismaClient.handling.update({
            where: { id: handling.id },
            data: {
              name: handling.name,
              price: handling.price,
            },
          });
        }
        break;
      default:
        throw new ResponseError(400, 'Invalid name');
    }

    return true;
  }
}
