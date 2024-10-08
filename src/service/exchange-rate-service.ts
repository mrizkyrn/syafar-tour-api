import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import {
  ExchangeRateResponse,
  toExchangeRateResponse,
  CreateExchangeRateRequest,
  BulkUpdateExchangeRateRequest,
} from '../model/exchange-rate-model';
import { ExchangeRateValidation } from '../validation/exchange-rate-validation';
import { Validation } from '../validation/validation';

export class ExchangeRateService {
  static async create(request: CreateExchangeRateRequest): Promise<ExchangeRateResponse> {
    const createRequest = Validation.validate(ExchangeRateValidation.CREATE, request);

    const exchangeRate = await prismaClient.exchangeRate.create({
      data: createRequest,
    });

    return toExchangeRateResponse(exchangeRate);
  }

  static async bulkUpdate(request: BulkUpdateExchangeRateRequest[]): Promise<void> {
    const bulkUpdateRequest = Validation.validate(ExchangeRateValidation.BULK_UPDATE, request);

    bulkUpdateRequest.forEach(async (updateRequest) => {
      await prismaClient.exchangeRate.update({
        where: { id: updateRequest.id },
        data: updateRequest,
      });
    });
  }

  static async delete(id: string): Promise<void> {
    await this.#checkExchangeRateExist(id);

    await prismaClient.exchangeRate.delete({
      where: { id },
    });
  }

  static async getAll(): Promise<ExchangeRateResponse[]> {
    const exchangeRates = await prismaClient.exchangeRate.findMany();
    return exchangeRates.map(toExchangeRateResponse);
  }

  static async get(id: string): Promise<ExchangeRateResponse> {
    const exchangeRate = await prismaClient.exchangeRate.findUnique({
      where: { id },
    });

    if (!exchangeRate) {
      throw new ResponseError(404, 'Exchange rate not found');
    }

    return toExchangeRateResponse(exchangeRate);
  }

  static async #checkExchangeRateExist(id: string): Promise<void> {
    const exchangeRate = await prismaClient.exchangeRate.findUnique({
      where: { id },
    });

    if (!exchangeRate) {
      throw new ResponseError(404, 'Exchange rate not found');
    }
  }
}