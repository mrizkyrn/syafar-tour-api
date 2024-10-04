import { z, ZodType } from 'zod';

export class VendorValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string({ message: 'Nama vendor harus diisi' }),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string({ message: 'Nama vendor harus diisi' }),
  });
}
