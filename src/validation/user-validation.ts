import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly QUERY: ZodType = z.object({
    full_name: z.string().optional(),
    email: z.string().email().optional(),
    whatsapp_number: z.string().min(10).max(15).optional(),
    role: z.string().optional(),
    sort: z.string().optional(),
    order: z.string().optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
  });

  static readonly UPDATE_CURRENT: ZodType = z.object({
    full_name: z
      .string()
      .min(3, 'Nama lengkap minimal 3 karakter')
      .max(100, 'Nama lengkap maksimal 100 karakter')
      .optional(),
    email: z.string().email('Email tidak valid').optional(),
    whatsapp_number: z.string().min(10, 'Nomor WhatsApp tidak valid').max(15, 'Nomor WhatsApp tidak valid').optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    full_name: z
      .string()
      .min(3, 'Nama lengkap minimal 3 karakter')
      .max(100, 'Nama lengkap maksimal 100 karakter')
      .optional(),
    email: z.string().email('Email tidak valid').optional(),
    whatsapp_number: z.string().min(10, 'Nomor WhatsApp tidak valid').max(15, 'Nomor WhatsApp tidak valid').optional(),
    role: z.string().optional(),
  });
  
  static readonly UPDATE_PASSWORD: ZodType = z.object({
    old_password: z
      .string({ required_error: 'Password lama tidak boleh kosong' })
      .min(1, 'Password lama tidak boleh kosong'),
    new_password: z
      .string({
        required_error: 'Password baru tidak boleh kosong',
      })
      .min(6, 'Password minimal 6 karakter')
      .max(100, 'Password maksimal 100 karakter'),
  });
}
