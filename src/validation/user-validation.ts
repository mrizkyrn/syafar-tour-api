import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly UPDATE: ZodType = z.object({
    full_name: z.string().min(3).max(100).optional(),
    email: z.string().email().optional(),
    whatsapp_number: z.string().min(10).max(15).optional(),
  });
  static readonly UPDATE_PASSWORD: ZodType = z.object({
    old_password: z.string().max(100),
    new_password: z.string().min(6).max(100),
  });
}
