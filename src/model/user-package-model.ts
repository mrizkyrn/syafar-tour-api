import { Decimal } from '@prisma/client/runtime/library';

export type UserPackageResponse = {
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

export type CreateUserPackageRequest = {
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

export function toUserPackageResponse(userPackage: any): UserPackageResponse {
  return {
    id: userPackage.id,
    number_of_pax: userPackage.number_of_pax,
    transportation: userPackage.transportation?.name,
    flight: userPackage.flight?.name,
    travel_duration: userPackage.travel_duration,
    mekkah_duration: userPackage.mekkah_duration,
    madinah_duration: userPackage.madinah_duration,
    hotel_mekkah: userPackage.hotelMekkah?.name,
    hotel_madinah: userPackage.hotelMadinah?.name,
    muthawif: userPackage.muthawif?.name,
    handling: userPackage.handling?.name,
    total_price: userPackage.total_price,
    per_pax_price: userPackage.per_pax_price,
  };
}
