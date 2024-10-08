export type MitraPackageResponse = {
  id: string;
  number_of_pax: number;
  period: Period;
  departure_date: Date;
  travel_duration: number;
  mekkah_duration: number;
  madinah_duration: number;
  airline: NamedPrice;
  vendor: NamedPrice;
  hotel_mekkah: Hotel;
  hotel_madinah: Hotel;
  mekkah_room_type: string;
  madinah_room_type: string;
  visa: NamedPrice;
  transportation: NamedPrice;
  muthawif: NamedPrice;
  handling_saudi: NamedPrice;
  handling_domestic: NamedPrice;
  siskopatuh: NamedPrice;
  equipment: NamedPrice;
  tour_plus: NamedPrice;
  manasik: NamedPrice;
  tour_leader: number;
  margin: number;
  total_price: number;
  per_pax_price: number;
};

type NamedPrice = {
  name: string;
  price_idr: number;
};

type Hotel = {
  name: string;
  price_double: number;
  price_triple: number;
  price_quad: number;
};

type Period = {
  name: string;
  start_date: Date;
  end_date: Date;
};

export type CreateMitraPackageRequest = {
  number_of_pax: number;
  period_id: string;
  departure_date: Date;
  travel_duration: number;
  mekkah_duration: number;
  madinah_duration: number;
  airline_id: string;
  vendor_id: string;
  hotel_mekkah_id: string;
  hotel_madinah_id: string;
  mekkah_room_type: string;
  madinah_room_type: string;
  visa_id: string;
  transportation_id: string;
  muthawif_id: string;
  handling_saudi_id: string;
  handling_domestic_id: string;
  siskopatuh_id: string;
  equipment_id: string;
  tour_plus_id: string;
  manasik_id: string;
  tour_leader: number;
  margin: number;
};

export function toMitraPackageResponse(mitraPackage: any): MitraPackageResponse {
  return {
    id: mitraPackage.id,
    number_of_pax: mitraPackage.number_of_pax,
    period: mitraPackage.period,
    departure_date: mitraPackage.departure_date,
    travel_duration: mitraPackage.travel_duration,
    mekkah_duration: mitraPackage.mekkah_duration,
    madinah_duration: mitraPackage.madinah_duration,
    airline: mitraPackage.airline,
    vendor: mitraPackage.vendor,
    hotel_mekkah: {
      name: mitraPackage.hotelMekkah.name,
      price_double: mitraPackage.hotelMekkah.HotelPeriodPrices[0].price_double,
      price_triple: mitraPackage.hotelMekkah.HotelPeriodPrices[0].price_triple,
      price_quad: mitraPackage.hotelMekkah.HotelPeriodPrices[0].price_quad,
    },
    hotel_madinah: {
      name: mitraPackage.hotelMadinah.name,
      price_double: mitraPackage.hotelMadinah.HotelPeriodPrices[0].price_double,
      price_triple: mitraPackage.hotelMadinah.HotelPeriodPrices[0].price_triple,
      price_quad: mitraPackage.hotelMadinah.HotelPeriodPrices[0].price_quad,
    },
    mekkah_room_type: mitraPackage.mekkah_room_type,
    madinah_room_type: mitraPackage.madinah_room_type,
    visa: mitraPackage.visa,
    transportation: mitraPackage.transportation,
    muthawif: mitraPackage.muthawif,
    handling_saudi: mitraPackage.handlingSaudi,
    handling_domestic: mitraPackage.handlingDomestic,
    siskopatuh: mitraPackage.siskopatuh,
    equipment: mitraPackage.equipment,
    tour_plus: mitraPackage.tourPlus,
    manasik: mitraPackage.manasik,
    tour_leader: mitraPackage.tour_leader,
    margin: mitraPackage.margin,
    total_price: mitraPackage.total_price,
    per_pax_price: mitraPackage.per_pax_price,
  };
}
