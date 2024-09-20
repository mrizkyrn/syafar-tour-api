import { z, ZodType } from 'zod';

export class UserServiceValidation {
  static readonly BULK_UPDATE: ZodType = z.object({
    id: z.string(),
    service_name: z.string().optional(),
    service_price: z.number().optional(),
  });
}
