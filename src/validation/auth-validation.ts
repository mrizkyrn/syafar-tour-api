import { z, ZodType } from 'zod';

export class AuthValidation {
  static readonly REGISTER: ZodType = z.object({
    full_name: z.string().min(3, 'Nama lengkap minimal 3 karakter').max(100, 'Nama lengkap maksimal 100 karakter'),
    email: z.string().email('Email tidak valid'),
    whatsapp_number: z
      .string()
      .min(10, 'Nomor WhatsApp tidak valid')
      .max(15, 'Nomor WhatsApp tidak valid'),
    password: z.string().min(6, 'Password minimal 6 karakter').max(100, 'Password maksimal 100 karakter'),
    role: z
      .string()
      .regex(/^(ADMIN|MITRA|USER)$/)
      .default('USER'),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z.string().email(),
    password: z.string()
  });
}
