import { z, ZodType } from 'zod';

export class UserServiceValidation {
  static readonly BULK_UPDATE: ZodType = z.object({
    id: z.string().optional(),
    name: z.string(),
    price: z.number(),
    order_number: z.number(),
  });
}
