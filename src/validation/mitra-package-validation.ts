import { z, ZodType } from 'zod';

export class MitraPackageValidation {
  static readonly CREATE: ZodType = z.object({
    number_of_pax: z.number().int({ message: 'Jumlah pax harus diisi' }),
    period_id: z.string({ message: 'ID periode harus diisi' }),
    departure_date: z
      .string({ required_error: 'Tanggal keberangkatan harus diisi' })
      .refine((val) => !isNaN(new Date(val).getTime()), {
        message: 'Tanggal keberangkatan harus berupa tanggal yang valid',
      })
      .transform((val) => new Date(val)),
    travel_duration: z.number().int({ message: 'Durasi perjalanan harus diisi' }),
    mekkah_duration: z.number().int({ message: 'Durasi di Mekkah harus diisi' }),
    madinah_duration: z.number().int({ message: 'Durasi di Madinah harus diisi' }),
    airline_id: z.string({ message: 'ID maskapai harus diisi' }),
    vendor_id: z.string({ message: 'ID vendor harus diisi' }),
    hotel_mekkah_id: z.string({ message: 'ID hotel Mekkah harus diisi' }),
    hotel_madinah_id: z.string({ message: 'ID hotel Madinah harus diisi' }),
    mekkah_room_type: z.string({ message: 'Tipe kamar di Mekkah harus diisi' }),
    madinah_room_type: z.string({ message: 'Tipe kamar di Madinah harus diisi' }),
    visa_id: z.string({ message: 'ID visa harus diisi' }),
    transportation_id: z.string({ message: 'ID transportasi harus diisi' }),
    muthawif_id: z.string({ message: 'ID muthawif harus diisi' }),
    handling_saudi_id: z.string({ message: 'ID handling Saudi harus diisi' }),
    handling_domestic_id: z.string({ message: 'ID handling domestik harus diisi' }),
    siskopatuh_id: z.string({ message: 'ID siskopatuh harus diisi' }),
    equipment_id: z.string({ message: 'ID equipment harus diisi' }),
    tour_plus_id: z.string({ message: 'ID tour harus diisi' }),
    manasik_id: z.string({ message: 'ID manasik harus diisi' }),
    tour_leader: z.number().int({ message: 'Tour leader harus diisi' }),
    margin: z.number().int({ message: 'Margin harus diisi' }),
  });
}
