import { promise } from 'zod';
import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import {
  HotelResponse,
  toHotelResponse,
  CreateHotelRequest,
  UpdateHotelRequest,
  HotelQueryParams,
  BulkUpdateHotelRequest,
} from '../model/hotel-model';
import { HotelValidation } from '../validation/hotel-validation';
import { Validation } from '../validation/validation';

export class HotelService {
  static async create(request: CreateHotelRequest): Promise<HotelResponse> {
    const createRequest = Validation.validate(HotelValidation.CREATE, request);

    const hotelId = await this.#createHotel(createRequest);

    const hotelWithDetails = await prismaClient.hotel.findUnique({
      where: {
        id: hotelId,
      },
      include: {
        Vendor: true,
        HotelPeriodPrices: {
          include: {
            Period: true,
          },
        },
      },
    });

    if (!hotelWithDetails) {
      throw new ResponseError(404, 'Hotel tidak ditemukan');
    }

    return toHotelResponse(hotelWithDetails);
  }

  // static async update(id: string, request: UpdateHotelRequest): Promise<HotelResponse> {
  //   const updateRequest = Validation.validate(HotelValidation.UPDATE, request);

  //   await this.#checkHotelExist(id);

  //   const hotel = await prismaClient.hotel.update({
  //     where: { id },
  //     data: updateRequest,
  //     include: {
  //       Vendor: true,
  //       Period: true,
  //     },
  //   });

  //   return toHotelResponse(hotel);
  // }

  static async bulkUpdate(request: BulkUpdateHotelRequest): Promise<void> {
    const { modified, deleted } = Validation.validate(HotelValidation.BULK_UPDATE, request);

    // If modified is not empty, update or create the hotel
    if (modified && modified.length > 0) {
      await Promise.all(
        modified.map(async (hotel) => {
          // Check if the hotel already exists
          const existingHotel = await prismaClient.hotel.findUnique({
            where: { id: hotel.hotel_id },
          });

          // If the hotel does not exist, create a new hotel
          if (!existingHotel) {
            await this.#createHotel({
              vendor_id: hotel.vendor_id,
              name: hotel.name,
              city: hotel.city,
              order_number: hotel.order_number,
              prices: {
                double: hotel.price_double,
                triple: hotel.price_triple,
                quad: hotel.price_quad,
              },
            });
            // If the hotel exists, update the hotel
          } else {
            // Update the hotel
            await prismaClient.hotel.update({
              where: { id: hotel.hotel_id },
              data: {
                name: hotel.name,
                order_number: hotel.order_number,
              },
            });

            // Update the hotel period prices
            await prismaClient.hotelPeriodPrice.update({
              where: {
                hotel_id_period_id: {
                  hotel_id: hotel.hotel_id,
                  period_id: hotel.period_id,
                },
              },
              data: {
                price_double: hotel.price_double,
                price_triple: hotel.price_triple,
                price_quad: hotel.price_quad,
              },
            });
          }
        })
      );
    }

    if (deleted && deleted.length > 0) {
      await Promise.all(
        deleted.map(async (hotelId) => {
          await prismaClient.hotel.delete({
            where: { id: hotelId },
          });
        })
      );
    }
  }

  static async delete(id: string): Promise<void> {
    await this.#checkHotelExist(id);

    await prismaClient.hotel.delete({
      where: { id },
    });
  }

  static async getById(id: string): Promise<HotelResponse> {
    const hotel = await prismaClient.hotel.findUnique({
      where: { id },
      include: {
        Vendor: true,
        HotelPeriodPrices: {
          include: {
            Period: true,
          },
        },
      },
    });

    if (!hotel) {
      throw new ResponseError(404, 'Hotel tidak ditemukan');
    }

    return toHotelResponse(hotel);
  }

  static async getAll(queryParams: HotelQueryParams): Promise<HotelResponse[]> {
    const queryRequest = Validation.validate(HotelValidation.QUERY, queryParams);

    const hotels = await prismaClient.hotel.findMany({
      where: {
        vendor_id: queryRequest.vendor_id,
        city: queryRequest.city,
      },
      include: {
        Vendor: true,
        HotelPeriodPrices: {
          include: {
            Period: true,
          },
          where: {
            period_id: queryRequest.period_id,
          },
        },
      },
      orderBy: {
        order_number: 'asc',
      },
    });

    return hotels.map(toHotelResponse);
  }

  static async getAllHotelPeriodPrices(): Promise<HotelResponse[]> {
    const hotels = await prismaClient.hotel.findMany({
      include: {
        Vendor: true,
        HotelPeriodPrices: {
          include: {
            Period: true,
          },
        },
      },
      orderBy: {
        order_number: 'asc',
      },
    });

    return hotels.map(toHotelResponse);
  }

  static async #checkHotelExist(id: string): Promise<void> {
    const hotel = await prismaClient.hotel.findUnique({
      where: { id },
    });

    if (!hotel) {
      throw new ResponseError(404, 'Hotel tidak ditemukan');
    }
  }

  static async #createHotel(data: CreateHotelRequest): Promise<string> {
    const hotel = await prismaClient.hotel.create({
      data: {
        vendor_id: data.vendor_id,
        name: data.name,
        city: data.city,
        order_number: data.order_number,
      },
    });

    const periods = await prismaClient.period.findMany();

    const periodPricesData = periods.map((period) => ({
      hotel_id: hotel.id,
      period_id: period.id,
      price_double: data.prices.double,
      price_triple: data.prices.triple,
      price_quad: data.prices.quad,
    }));

    await prismaClient.hotelPeriodPrice.createMany({
      data: periodPricesData,
    });

    return hotel.id;
  }
}
