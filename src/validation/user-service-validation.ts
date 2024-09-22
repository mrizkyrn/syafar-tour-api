import { z, ZodType } from 'zod';

export class UserServiceValidation {
  static readonly BULK_UPDATE: ZodType = z.object({
    id: z.string().optional(),
    service_name: z.string(),
    service_price: z.number(),
  });
}
