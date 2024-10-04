import { Hotel, HotelPeriodPrice, Period, Vendor } from '@prisma/client';
import { toVendorResponse, VendorResponse } from './vendor-model';
import { PeriodResponse, toPeriodResponse } from './period-model';

export type HotelResponse = {
  id: string;
  vendor: VendorResponse;
  name: string;
  city: 'MEKKAH' | 'MADINAH';
  order_number: number;
  periods: {
    period: PeriodResponse;
    price_double: number;
    price_triple: number;
    price_quad: number;
  }[];
  created_at: Date;
  updated_at: Date;
};

export type HotelQueryParams = {
  vendor_id?: string;
  period_id?: string;
  city?: 'MEKKAH' | 'MADINAH';
};

export type CreateHotelRequest = {
  vendor_id: string;
  name: string;
  city: 'MEKKAH' | 'MADINAH';
  prices: {
    double: number;
    triple: number;
    quad: number;
  };
  order_number: number;
};

export type UpdateHotelRequest = CreateHotelRequest;

export type BulkUpdateHotelRequest = {
  modified:
    | {
        period_id: string;
        vendor_id: string;
        city: 'MEKKAH' | 'MADINAH';
        hotel_id: string;
        name: string;
        order_number: number;
        price_double: number;
        price_triple: number;
        price_quad: number;
      }[]
    | undefined;
  deleted: string[] | undefined;
};

export function toHotelResponse(
  hotel: Hotel & {
    Vendor: Vendor;
    HotelPeriodPrices: (HotelPeriodPrice & {
      Period: Period;
    })[];
  }
): HotelResponse {
  return {
    id: hotel.id,
    vendor: toVendorResponse(hotel.Vendor),
    name: hotel.name,
    city: hotel.city,
    order_number: hotel.order_number,
    periods: hotel.HotelPeriodPrices.map((hotelPeriodPrice) => ({
      period: toPeriodResponse(hotelPeriodPrice.Period),
      price_double: Number(hotelPeriodPrice.price_double),
      price_triple: Number(hotelPeriodPrice.price_triple),
      price_quad: Number(hotelPeriodPrice.price_quad),
    })),
    created_at: hotel.created_at,
    updated_at: hotel.updated_at,
  };
}
