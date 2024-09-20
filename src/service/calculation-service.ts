import { prismaClient } from '../application/database';
import { logger } from '../application/logger';
import { ResponseError } from '../error/response-error';
import { CalculationResponse, CreateCalculationRequest, toCalculationResponse } from '../model/calculation-model';
import { CalculationValidation } from '../validation/calculation-validation';
import { Validation } from '../validation/validation';

export class CalculationService {
  static async create(request: CreateCalculationRequest): Promise<CalculationResponse> {
    const createRequest = Validation.validate(CalculationValidation.CREATE, request);
    const total_price = await this.calculateTotal(createRequest);

    const calculation = await prismaClient.calculation.create({
      data: {
        ...createRequest,
        total_price,
        per_pax_price: total_price / createRequest.number_of_pax,
      },
    });

    const response = await this.get(calculation.id);
    return response;
  }

  static async get(id: string): Promise<CalculationResponse> {
    const calculation = await prismaClient.calculation.findUnique({
      where: { id },
      include: {
        transportation: {
          select: {
            service_name: true,
          },
        },
        flight: {
          select: {
            service_name: true,
          },
        },
        hotelMekkah: {
          select: {
            service_name: true,
          },
        },
        hotelMadinah: {
          select: {
            service_name: true,
          },
        },
        muthawif: {
          select: {
            service_name: true,
          },
        },
        handling: {
          select: {
            service_name: true,
          },
        },
      },
    });

    if (!calculation) {
      throw new ResponseError(404, 'Calculation not found');
    }

    console.log(calculation);

    return toCalculationResponse(calculation);
  }

  static async calculateTotal(request: CreateCalculationRequest): Promise<number> {
    const { number_of_pax, transportation_id, flight_id, travel_duration, mekkah_duration, madinah_duration, hotel_mekkah_id, hotel_madinah_id, muthawif_id, handling_id } = request;

    const transportation = await prismaClient.userService.findUnique({
      where: { id: transportation_id },
    });
    const flight = await prismaClient.userService.findUnique({
      where: { id: flight_id },
    });
    const hotelMekkah = await prismaClient.userService.findUnique({
      where: { id: hotel_mekkah_id },
    });
    const hotelMadinah = await prismaClient.userService.findUnique({
      where: { id: hotel_madinah_id },
    });
    const muthawif = await prismaClient.userService.findUnique({
      where: { id: muthawif_id },
    });
    const handling = await prismaClient.userService.findUnique({
      where: { id: handling_id },
    });

    if (!transportation || !flight || !hotelMekkah || !hotelMadinah || !muthawif || !handling) {
      throw new ResponseError(404, 'Service not found');
    }

    let totalPrice = 0;
    totalPrice += Number(transportation.service_price);
    totalPrice += Number(flight.service_price);
    totalPrice += Number(hotelMekkah.service_price) * mekkah_duration;
    totalPrice += Number(hotelMadinah.service_price) * madinah_duration;
    totalPrice += Number(muthawif.service_price);
    totalPrice += Number(handling.service_price);
    totalPrice *= number_of_pax;
    
    return totalPrice;
  }
}
