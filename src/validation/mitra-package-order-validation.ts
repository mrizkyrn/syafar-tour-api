import { z, ZodType } from 'zod';

export class MitraPackageValidation {
  static readonly CREATE: ZodType = z.object({
    mitra_package_id: z.string({ message: 'ID paket mitra harus diisi' }),
  });

  static readonly QUERY: ZodType = z.object({
    search: z.string().optional(),
    sort: z.string().optional(),
    order: z.string().optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
  });
}
