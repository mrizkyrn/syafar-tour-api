import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly UPDATE: ZodType = z.object({
    full_name: z.string().min(3).max(100).optional(),
    email: z.string().email().optional(),
    whatsapp_number: z.string().min(10).max(15).optional(),
  });
}
