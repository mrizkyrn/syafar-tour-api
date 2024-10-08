import { z, ZodType } from 'zod';

export class MitraPackageValidation {
  static readonly CREATE: ZodType = z.object({
    mitra_package_id: z.string({ message: 'ID paket mitra harus diisi' }),
  });
}
