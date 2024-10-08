import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { MitraPackageResponse, toMitraPackageResponse, CreateMitraPackageRequest } from '../model/mitra-package-model';
import { MitraPackageValidation } from '../validation/mitra-package-validation';
import { Validation } from '../validation/validation';

export class MitraPackageService {
  static async create(request: CreateMitraPackageRequest): Promise<string> {
    const createRequest = Validation.validate(MitraPackageValidation.CREATE, request);
    const per_pax_price = await this.#calculateTotal(createRequest);

    const response = await prismaClient.mitraPackage.create({
      data: {
        ...createRequest,
        per_pax_price,
        total_price: per_pax_price.mul(createRequest.number_of_pax),
      },
    });

    return response.id;
  }

  static async get(id: string): Promise<MitraPackageResponse> {
    const mitraPackage = await prismaClient.mitraPackage.findUnique({
      where: { id },
      include: {
        period: true,
        airline: { select: { name: true, price_idr: true } },
        vendor: { select: { name: true } },
        visa: { select: { name: true, price_idr: true } },
        transportation: { select: { name: true, price_idr: true } },
        muthawif: { select: { name: true, price_idr: true } },
        handlingSaudi: { select: { name: true, price_idr: true } },
        handlingDomestic: { select: { name: true, price_idr: true } },
        siskopatuh: { select: { name: true, price_idr: true } },
        equipment: { select: { name: true, price_idr: true } },
        tourPlus: { select: { name: true, price_idr: true } },
        manasik: { select: { name: true, price_idr: true } },
      },
    });

    if (!mitraPackage) {
      throw new ResponseError(404, 'Mitra package not found');
    }

    // Fetch the Mekkah hotel prices for the current period
    const hotelMekkah = await prismaClient.hotel.findUnique({
      where: { id: mitraPackage.hotel_mekkah_id ?? '' },
      include: {
        HotelPeriodPrices: {
          include: {
            Period: true,
          },
          where: {
            period_id: mitraPackage.period_id ?? '',
          },
        },
      },
    });

    // Fetch the Madinah hotel prices for the current period
    const hotelMadinah = await prismaClient.hotel.findUnique({
      where: { id: mitraPackage.hotel_madinah_id ?? '' },
      include: {
        HotelPeriodPrices: {
          include: {
            Period: true,
          },
          where: {
            period_id: mitraPackage.period_id ?? '',
          },
        },
      },
    });

    // Assign the hotels to the mitraPackage object
    const fullMitraPackage = {
      ...mitraPackage,
      hotelMekkah,
      hotelMadinah,
    };

    console.log('mitraPackage', fullMitraPackage);

    return toMitraPackageResponse(fullMitraPackage);
  }

  static async #calculateTotal(request: CreateMitraPackageRequest): Promise<Decimal> {
    // Fetch the exchange rate
    const SARtoIDR = await prismaClient.exchangeRate.findFirst({
      where: { currency: 'SAR' },
      select: { rate_idr: true },
    });

    const exchangeRate = SARtoIDR?.rate_idr || new Prisma.Decimal(1);

    // Fetch the airline price
    const airline = await prismaClient.airline.findUnique({
      where: { id: request.airline_id },
      select: { price_idr: true },
    });

    // Fetch the visa price
    const visa = await prismaClient.visa.findUnique({
      where: { id: request.visa_id },
      select: { price_idr: true },
    });

    // Fetch the transportation price
    const transportation = await prismaClient.transportation.findUnique({
      where: { id: request.transportation_id },
      select: { price_idr: true },
    });

    // Fetch hotel prices for Mekkah and Madinah
    const hotelMekkah = await prismaClient.hotelPeriodPrice.findUnique({
      where: {
        hotel_id_period_id: {
          hotel_id: request.hotel_mekkah_id,
          period_id: request.period_id,
        },
      },
      select: { price_double: true, price_triple: true, price_quad: true },
    });

    const hotelMadinah = await prismaClient.hotelPeriodPrice.findUnique({
      where: {
        hotel_id_period_id: {
          hotel_id: request.hotel_madinah_id,
          period_id: request.period_id,
        },
      },
      select: { price_double: true, price_triple: true, price_quad: true },
    });

    // Determine the correct price for Mekkah room type in SAR and multiply by exchange rate
    let mekkahHotelPrice: Decimal = new Prisma.Decimal(0);
    if (request.mekkah_room_type.toLowerCase() === 'double') {
      mekkahHotelPrice = hotelMekkah?.price_double?.mul(exchangeRate) || new Prisma.Decimal(0);
    } else if (request.mekkah_room_type.toLowerCase() === 'triple') {
      mekkahHotelPrice = hotelMekkah?.price_triple?.mul(exchangeRate) || new Prisma.Decimal(0);
    } else if (request.mekkah_room_type.toLowerCase() === 'quad') {
      mekkahHotelPrice = hotelMekkah?.price_quad?.mul(exchangeRate) || new Prisma.Decimal(0);
    }

    // Determine the correct price for Madinah room type in SAR and multiply by exchange rate
    let madinahHotelPrice: Decimal = new Prisma.Decimal(0);
    if (request.madinah_room_type.toLowerCase() === 'double') {
      madinahHotelPrice = hotelMadinah?.price_double?.mul(exchangeRate) || new Prisma.Decimal(0);
    } else if (request.madinah_room_type.toLowerCase() === 'triple') {
      madinahHotelPrice = hotelMadinah?.price_triple?.mul(exchangeRate) || new Prisma.Decimal(0);
    } else if (request.madinah_room_type.toLowerCase() === 'quad') {
      madinahHotelPrice = hotelMadinah?.price_quad?.mul(exchangeRate) || new Prisma.Decimal(0);
    }

    // Fetch the muthawif price
    const muthawif = await prismaClient.muthawif.findUnique({
      where: { id: request.muthawif_id },
      select: { price_idr: true },
    });

    // Fetch the handling saudi price
    const handlingSaudi = await prismaClient.handlingSaudi.findUnique({
      where: { id: request.handling_saudi_id },
      select: { price_idr: true },
    });

    // Fetch the handling domestic price
    const handlingDomestic = await prismaClient.handlingDomestic.findUnique({
      where: { id: request.handling_domestic_id },
      select: { price_idr: true },
    });

    // Fetch the siskopatuh price
    const siskopatuh = await prismaClient.siskopatuh.findUnique({
      where: { id: request.siskopatuh_id },
      select: { price_idr: true },
    });

    // Fetch the equipment price
    const equipment = await prismaClient.equipment.findUnique({
      where: { id: request.equipment_id },
      select: { price_idr: true },
    });

    // Fetch the tour plus price
    const tourPlus = await prismaClient.tourPlus.findUnique({
      where: { id: request.tour_plus_id },
      select: { price_idr: true },
    });

    // Fetch the manasik price
    const manasik = await prismaClient.manasik.findUnique({
      where: { id: request.manasik_id },
      select: { price_idr: true },
    });

    console.log('airline', airline?.price_idr);
    console.log('visa', visa?.price_idr);
    console.log('transportation', transportation?.price_idr);
    console.log('mekkahHotelPrice', mekkahHotelPrice);
    console.log('madinahHotelPrice', madinahHotelPrice);
    console.log('muthawif', muthawif?.price_idr);
    console.log('handlingSaudi', handlingSaudi?.price_idr);
    console.log('handlingDomestic', handlingDomestic?.price_idr);
    console.log('siskopatuh', siskopatuh?.price_idr);
    console.log('equipment', equipment?.price_idr);
    console.log('tourPlus', tourPlus?.price_idr);
    console.log('manasik', manasik?.price_idr);

    // Sum all the prices
    let total_price = new Prisma.Decimal(0)
      .add(airline?.price_idr || 0)
      .add(visa?.price_idr || 0)
      .add(transportation?.price_idr || 0)
      .add(mekkahHotelPrice?.mul(request.mekkah_duration) || 0)
      .add(madinahHotelPrice?.mul(request.madinah_duration) || 0)
      .add(muthawif?.price_idr || 0)
      .add(handlingSaudi?.price_idr || 0)
      .add(handlingDomestic?.price_idr || 0)
      .add(siskopatuh?.price_idr || 0)
      .add(equipment?.price_idr || 0)
      .add(tourPlus?.price_idr || 0)
      .add(manasik?.price_idr || 0);

    const paxMultiplier = request.number_of_pax > 0 ? request.number_of_pax : 1;
    const tourLeaderMultiplier = request.tour_leader > 0 ? request.tour_leader : 1;

    // Divide by number of pax and tour leader ratio
    total_price = total_price.add(total_price.mul(tourLeaderMultiplier).div(paxMultiplier));

    // Add margin
    total_price = total_price.add(request.margin);

    return total_price;
  }
}
