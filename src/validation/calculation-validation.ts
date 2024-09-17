import { z, ZodType } from 'zod';

export class CalculationValidation {
  static readonly CREATE: ZodType = z.object({
    number_of_pax: z.number().int().positive('Jumlah pax harus positif').max(100, 'Jumlah pax maksimal 100'),
    transportation_id: z.string(),
    flight_id: z.string(),
    travel_duration: z
      .number()
      .int()
      .positive('Durasi perjalanan harus positif')
      .max(100, 'Durasi perjalanan maksimal 100'),
    mekkah_duration: z
      .number()
      .int()
      .positive('Durasi di Mekkah harus positif')
      .max(100, 'Durasi di Mekkah maksimal 100'),
    maddinah_duration: z
      .number()
      .int()
      .positive('Durasi di Maddinah harus positif')
      .max(100, 'Durasi di Maddinah maksimal 100'),
    hotel_mekkah_id: z.string(),
    hotel_maddinah_id: z.string(),
    muthawwif_id: z.string(),
    handling_id: z.string(),
  });
}
