import { z, ZodType } from 'zod';

export class UserPackageValidation {
  static readonly CREATE: ZodType = z.object({
    number_of_pax: z.number().int({ message: 'Jumlah pax harus integer' }).positive('Jumlah pax harus positif'),
    travel_duration: z
      .number()
      .int({ message: 'Durasi perjalanan harus integer' })
      .positive('Durasi perjalanan harus positif'),
    mekkah_duration: z
      .number()
      .int({ message: 'Durasi di Mekkah harus integer' })
      .positive('Durasi di Mekkah harus positif'),
    madinah_duration: z
      .number()
      .int({ message: 'Durasi di Madinah harus integer' })
      .positive('Durasi di Madinah harus positif'),
    transportation_id: z.string({ message: 'Transportasi harus diisi' }),
    flight_id: z.string({ message: 'Tiket pesawat harus diisi' }),
    hotel_mekkah_id: z.string({ message: 'Hotel di Mekkah harus diisi' }),
    hotel_madinah_id: z.string({ message: 'Hotel di Madinah harus diisi' }),
    muthawif_id: z.string({ message: 'Muthawif harus diisi' }),
    handling_id: z.string({ message: 'Handling harus diisi' }),
  });
}
