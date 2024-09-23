import { Decimal } from '@prisma/client/runtime/library';

export type CalculationResponse = {
   id: string;
   number_of_pax: number;
   transportation: string;
   flight: string;
   travel_duration: number;
   mekkah_duration: number;
   madinah_duration: number;
   hotel_mekkah: string;
   hotel_madinah: string;
   muthawif: string;
   handling: string;
   total_price: Decimal;
   per_pax_price: Decimal;
};

export type CreateCalculationRequest = {
   number_of_pax: number;
   transportation_id: string;
   flight_id: string;
   travel_duration: number;
   mekkah_duration: number;
   madinah_duration: number;
   hotel_mekkah_id: string;
   hotel_madinah_id: string;
   muthawif_id: string;
   handling_id: string;
};

export function toCalculationResponse(calculation: any): CalculationResponse {
   return {
      id: calculation.id,
      number_of_pax: calculation.number_of_pax,
      transportation: calculation.transportation.name,
      flight: calculation.flight.name,
      travel_duration: calculation.travel_duration,
      mekkah_duration: calculation.mekkah_duration,
      madinah_duration: calculation.madinah_duration,
      hotel_mekkah: calculation.hotelMekkah.name,
      hotel_madinah: calculation.hotelMadinah.name,
      muthawif: calculation.muthawif.name,
      handling: calculation.handling.name,
      total_price: calculation.total_price,
      per_pax_price: calculation.per_pax_price,
   }
}