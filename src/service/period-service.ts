import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { PeriodResponse, toPeriodResponse, CreatePeriodRequest } from '../model/period-model';
import { PeriodValidation } from '../validation/period-validation';
import { Validation } from '../validation/validation';

export class PeriodService {
  static async create(request: CreatePeriodRequest): Promise<PeriodResponse> {
    const createRequest = Validation.validate(PeriodValidation.CREATE, request);
    console.log(createRequest);
    const period = await prismaClient.period.create({
      data: {
        category: createRequest.category,
        start_date: createRequest.start_date,
        end_date: createRequest.end_date,
      },
    });

    const hotels = await prismaClient.hotel.findMany();
    const periodPricesData = hotels.map((hotel) => ({
      hotel_id: hotel.id,
      period_id: period.id,
      price_double: 0,
      price_triple: 0,
      price_quad: 0,
    }));

    await prismaClient.hotelPeriodPrice.createMany({
      data: periodPricesData,
    });

    return toPeriodResponse(period);
  }

  static async update(id: string, request: CreatePeriodRequest): Promise<PeriodResponse> {
    const updateRequest = Validation.validate(PeriodValidation.UPDATE, request);

    await this.#checkPeriodExist(id);

    const period = await prismaClient.period.update({
      where: { id },
      data: updateRequest,
    });

    return toPeriodResponse(period);
  }

  static async delete(id: string): Promise<PeriodResponse> {
    await this.#checkPeriodExist(id);

    const period = await prismaClient.period.delete({
      where: { id },
    });

    if (!period) {
      throw new ResponseError(404, 'Periode tidak ditemukan');
    }

    return toPeriodResponse(period);
  }

  static async getById(id: string): Promise<PeriodResponse> {
    const period = await prismaClient.period.findUnique({
      where: { id },
    });

    if (!period) {
      throw new ResponseError(404, 'Periode tidak ditemukan');
    }

    return toPeriodResponse(period);
  }

  static async getAll(): Promise<PeriodResponse[]> {
    const periods = await prismaClient.period.findMany();

    return periods.map(toPeriodResponse);
  }

  static async #checkPeriodExist(id: string): Promise<void> {
    const period = await prismaClient.period.findUnique({
      where: { id },
    });

    if (!period) {
      throw new ResponseError(404, 'Periode tidak ditemukan');
    }
  }
}
