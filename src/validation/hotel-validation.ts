import { z, ZodType } from 'zod';


export class HotelValidation {
  static readonly CREATE: ZodType = z.object({
    vendor_id: z.string({ message: 'ID vendor harus diisi' }).cuid({ message: 'ID vendor tidak valid' }),
    name: z.string({ message: 'Nama hotel harus diisi' }),
    city: z.string({ message: 'Kota hotel harus diisi' }),
    order_number: z.number().int({ message: 'Nomor urut harus integer' }).min(1, 'Nomor urut minimal 1'),
    prices: z.object({
      double: z
        .number()
        .int({ message: 'Harga kamar double harus integer' })
        .min(0, 'Harga kamar double tidak boleh negatif'),
      triple: z
        .number()
        .int({ message: 'Harga kamar triple harus integer' })
        .min(0, 'Harga kamar triple tidak boleh negatif'),
      quad: z
        .number()
        .int({ message: 'Harga kamar quad harus integer' })
        .min(0, 'Harga kamar quad tidak boleh negatif'),
    }),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string({ message: 'Nama hotel harus diisi' }),
    city: z.string({ message: 'Kota hotel harus diisi' }),
    price_double: z
      .number()
      .int({ message: 'Harga kamar double harus integer' })
      .min(0, 'Harga kamar double tidak boleh negatif'),
    price_triple: z
      .number()
      .int({ message: 'Harga kamar triple harus integer' })
      .min(0, 'Harga kamar triple tidak boleh negatif'),
    price_quad: z
      .number()
      .int({ message: 'Harga kamar quad harus integer' })
      .min(0, 'Harga kamar quad tidak boleh negatif'),
    order_number: z.number().int({ message: 'Nomor urut harus integer' }).min(1, 'Nomor urut minimal 1'),
  });

  static readonly BULK_UPDATE: ZodType = z.object({
    modified: z.array(
      z.object({
        hotel_id: z.string({ message: 'ID hotel harus diisi' }),
        period_id: z.string({ message: 'ID periode harus diisi' }),
        vendor_id: z.string({ message: 'ID vendor harus diisi' }),
        city: z.string({ message: 'Kota hotel harus diisi' }),
        name: z.string({ message: 'Nama hotel harus diisi' }),
        price_double: z
          .number()
          .int({ message: 'Harga kamar double harus integer' })
          .min(0, 'Harga kamar double tidak boleh negatif'),
        price_triple: z
          .number()
          .int({ message: 'Harga kamar triple harus integer' })
          .min(0, 'Harga kamar triple tidak boleh negatif'),
        price_quad: z
          .number()
          .int({ message: 'Harga kamar quad harus integer' })
          .min(0, 'Harga kamar quad tidak boleh negatif'),
        order_number: z.number().int({ message: 'Nomor urut harus integer' }).min(1, 'Nomor urut minimal 1'),
      })
    ),
    deleted: z.array(z.string(), { message: 'ID hotel yang dihapus harus diisi' }).optional(),
  });

  static readonly QUERY: ZodType = z.object({
    vendor_id: z.string().optional(),
    period_id: z.string().optional(),
    city: z.string().optional(),
  });
}
