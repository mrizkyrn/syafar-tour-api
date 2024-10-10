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

  static readonly QUERY: ZodType = z.object({
    search: z.string().optional(),
    sort: z.string().optional(),
    order: z.string().optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
  });
}
