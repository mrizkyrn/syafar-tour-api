import { z, ZodType } from 'zod';

export class AuthValidation {
  static readonly REGISTER: ZodType = z.object({
    full_name: z
      .string({ required_error: 'Nama lengkap tidak boleh kosong' })
      .min(3, 'Nama lengkap minimal 3 karakter')
      .max(100, 'Nama lengkap maksimal 100 karakter'),
    email: z
      .string({ required_error: 'Email tidak boleh kosong' })
      .min(1, 'Email tidak boleh kosong')
      .email('Email tidak valid'),
    whatsapp_number: z
      .string({ required_error: 'Nomor Whatsapp tidak boleh kosong' })
      .min(10, 'Nomor WhatsApp tidak valid')
      .max(15, 'Nomor WhatsApp tidak valid'),
    password: z
      .string({ required_error: 'Password tidak boleh kosong' })
      .min(6, 'Password minimal 6 karakter')
      .max(100, 'Password maksimal 100 karakter'),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z.string({ required_error: 'Email tidak boleh kosong' }).email('Email tidak valid'),
    password: z.string({ required_error: 'Password tidak boleh kosong' }).min(1, 'Password tidak boleh kosong'),
  });
}
