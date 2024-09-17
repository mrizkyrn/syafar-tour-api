import { Calculation } from '@prisma/client';

export type CalculationResponse = {
   id: string;
   number_of_pax: number;
   transportation_id: string;
   flight_id: string;
   travel_duration: number;
   mekkah_duration: number;
   maddinah_duration: number;
   hotel_mekkah_id: string;
   hotel_maddinah_id: string;
   muthawwif_id: string;
   handling_id: string;
   total_price: number;
};

export function toCalculationResponse(calculation: Calculation): CalculationResponse {
   return {
      id: calculation.id,
      number_of_pax: calculation.number_of_pax,
      transportation_id: calculation.transportation_id,
      flight_id: calculation.flight_id,
      travel_duration: calculation.travel_duration,
      mekkah_duration: calculation.mekkah_duration,
      maddinah_duration: calculation.maddinah_duration,
      hotel_mekkah_id: calculation.hotel_mekkah_id,
      hotel_maddinah_id: calculation.hotel_maddinah_id,
      muthawwif_id: calculation.muthawwif_id,
      handling_id: calculation.handling_id,
      total_price: calculation.total_price,
   }
}