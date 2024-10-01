import { z, ZodType } from 'zod';

export class OrderValidation {
  static readonly CREATE: ZodType = z.object({
    product_id: z.string().cuid(),
    variation_id: z.string().optional(),
    departure: z.string().datetime(),
    number_of_pax: z.number().int().positive(),
    per_pax_price: z.number().positive(),
    total_price: z.number().positive(),
  });
}
