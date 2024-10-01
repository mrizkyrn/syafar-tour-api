import { z, ZodType } from 'zod';

export class UserPackageOrderValidation {
  static readonly CREATE: ZodType = z.object({
    full_name: z.string({ message: 'Nama lengkap harus diisi' }),
    email: z.string({ message: 'Email harus diisi' }).email({ message: 'Email tidak valid' }),
    whatsapp_number: z
      .string({ message: 'Nomor WhatsApp harus diisi' })
      .min(10, { message: 'Nomor WhatsApp tidak valid' })
      .max(15, { message: 'Nomor WhatsApp tidak valid' }),
    user_package_id: z.string({ message: 'ID paket harus diisi' }),
  });

  static readonly QUERY: ZodType = z.object({
    search: z.string().optional(),
    sort: z.string().optional(),
    order: z.string().optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
  });
}
