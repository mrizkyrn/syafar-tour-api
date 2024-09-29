import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { CreateUserPackageRequest, toUserPackageResponse, UserPackageResponse } from '../model/user-package-model';
import { UserPackageValidation } from '../validation/user-package-validation';
import { Validation } from '../validation/validation';

export class UserPackageService {
  static async create(request: CreateUserPackageRequest): Promise<{ id: string }> {
    const createRequest = Validation.validate(UserPackageValidation.CREATE, request);
    const total_price = await this.#calculateTotal(createRequest);
    
    const userPackage = await prismaClient.userPackage.create({
      data: {
        ...createRequest,
        total_price,
        per_pax_price: total_price / createRequest.number_of_pax,
      },
    });
    
    return { id: userPackage.id };
  }

  static async get(id: string): Promise<UserPackageResponse> {
    const userPackage = await prismaClient.userPackage.findUnique({
      where: { id },
      include: {
        transportation: {
          select: {
            name: true,
          },
        },
        flight: {
          select: {
            name: true,
          },
        },
        hotelMekkah: {
          select: {
            name: true,
          },
        },
        hotelMadinah: {
          select: {
            name: true,
          },
        },
        muthawif: {
          select: {
            name: true,
          },
        },
        handling: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!userPackage) {
      throw new ResponseError(404, 'User package not found');
    }

    return toUserPackageResponse(userPackage);
  }

  static async #calculateTotal(request: CreateUserPackageRequest): Promise<number> {
    const transportation = await prismaClient.userPackageOption.findUnique({
      where: { id: request.transportation_id },
    });
    const flight = await prismaClient.userPackageOption.findUnique({
      where: { id: request.flight_id },
    });
    const hotelMekkah = await prismaClient.userPackageOption.findUnique({
      where: { id: request.hotel_mekkah_id },
    });
    const hotelMadinah = await prismaClient.userPackageOption.findUnique({
      where: { id: request.hotel_madinah_id },
    });
    const muthawif = await prismaClient.userPackageOption.findUnique({
      where: { id: request.muthawif_id },
    });
    const handling = await prismaClient.userPackageOption.findUnique({
      where: { id: request.handling_id },
    });

    if (!transportation || !flight || !hotelMekkah || !hotelMadinah || !muthawif || !handling) {
      throw new ResponseError(404, 'User package items not found');
    }

    let total_price = 0;
    total_price += Number(transportation.price);
    total_price += Number(flight.price);
    total_price += Number(hotelMekkah.price) * request.mekkah_duration;
    total_price += Number(hotelMadinah.price) * request.madinah_duration;
    total_price += Number(muthawif.price);
    total_price += Number(handling.price);
    total_price *= request.number_of_pax;

    return total_price;
  }
}
