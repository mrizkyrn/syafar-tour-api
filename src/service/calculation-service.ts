import { prismaClient } from '../application/database';
import { logger } from '../application/logger';
import { ResponseError } from '../error/response-error';
import { toCalculationResponse } from '../model/calculation-model';
import { CalculationValidation } from '../validation/calculation-validation';
import { Validation } from '../validation/validation';

export class CalculationService {
  static async create(request: any) {
    const createRequest = Validation.validate(CalculationValidation.CREATE, request);
    const total_price = await this.calculateTotal(createRequest);

    const calculation = await prismaClient.calculation.create({
      data: {
        ...createRequest,
        total_price,
      },
    });

    logger.debug('record created', calculation);

    return toCalculationResponse(calculation);
  }

  static async get(id: string) {
    console.log(id);
    const calculation = await prismaClient.calculation.findUnique({
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
        hotelMaddinah: {
          select: {
            name: true,
          },
        },
        muthawwif: {
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
    console.log(calculation);
    if (!calculation) {
      throw new ResponseError(404, 'Calculation not found');
    }

    return calculation;
  }

  static async calculateTotal(request: any) {
    const {
      flight_id,
      hotel_mekkah_id,
      hotel_maddinah_id,
      transportation_id,
      muthawwif_id,
      handling_id,
      kotaMekkah,
      kotaMaddinah,
    } = request;

    const flightPrice = flight_id ? await prismaClient.flight.findUnique({ where: { id: flight_id } }) : null;
    const hotelMekkahPrice = hotel_mekkah_id
      ? await prismaClient.hotelMekkah.findUnique({ where: { id: hotel_mekkah_id } })
      : null;
    const hotelMaddinahPrice = hotel_maddinah_id
      ? await prismaClient.hotelMaddinah.findUnique({ where: { id: hotel_maddinah_id } })
      : null;
    const transportationPrice = transportation_id
      ? await prismaClient.transportation.findUnique({ where: { id: transportation_id } })
      : null;
    const muthawwifPrice = muthawwif_id
      ? await prismaClient.muthawwif.findUnique({ where: { id: muthawwif_id } })
      : null;
    const handlingPrice = handling_id ? await prismaClient.handling.findUnique({ where: { id: handling_id } }) : null;

    let totalPrice = 0;
    totalPrice += flightPrice ? flightPrice.price : 0;
    totalPrice += hotelMekkahPrice ? hotelMekkahPrice.price : 0;
    totalPrice += hotelMaddinahPrice ? hotelMaddinahPrice.price : 0;
    totalPrice += transportationPrice ? transportationPrice.price : 0;
    totalPrice += muthawwifPrice ? muthawwifPrice.price : 0;
    totalPrice += handlingPrice ? handlingPrice.price : 0;

    totalPrice += parseInt(kotaMekkah || '0') * (hotelMekkahPrice ? hotelMekkahPrice.price : 0);
    totalPrice += parseInt(kotaMaddinah || '0') * (hotelMaddinahPrice ? hotelMaddinahPrice.price : 0);

    return totalPrice;
  }
}
