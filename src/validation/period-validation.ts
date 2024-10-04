import { z, ZodType } from 'zod';

export class PeriodValidation {
  static readonly CREATE: ZodType = z.object({
    category: z.string({ message: 'Kategori periode harus diisi' }),
    start_date: z.string({ message: 'Tanggal mulai periode harus diisi' }).datetime(),
    end_date: z.string({ message: 'Tanggal akhir periode harus diisi' }).datetime(),
  });

  static readonly UPDATE: ZodType = z.object({
    category: z.string({ message: 'Kategori periode harus diisi' }),
    start_date: z.string({ message: 'Tanggal mulai periode harus diisi' }).datetime(),
    end_date: z.string({ message: 'Tanggal akhir periode harus diisi' }).datetime(),
  });
}
