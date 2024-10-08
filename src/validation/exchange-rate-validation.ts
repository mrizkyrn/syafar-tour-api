import { z, ZodType } from 'zod';

export class ExchangeRateValidation {
  static readonly CREATE: ZodType = z.object({
    currency: z.string({ message: 'Mata uang harus diisi' }),
    rate_idr: z.number().positive({ message: 'Nilai tukar tidak boleh negatif' }),
  });

  static readonly BULK_UPDATE: ZodType = z.array(
    z.object({
      id: z.string({ message: 'ID tidak boleh kosong' }),
      currency: z.string().optional(),
      rate_idr: z.number().positive().optional(),
    })
  );
}
