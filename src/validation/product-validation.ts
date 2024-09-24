import { z, ZodType } from 'zod';

const productVariationSchema = z.object({
  name: z.string().min(1).max(255).default('Room'),
  price: z.number().positive(),
});

export class ProductValidation {
  static readonly CREATE: ZodType = z.object({
    thumbnail: z.string(),
    name: z.string().min(1).max(255),
    description: z.string(),
    price: z.number().positive(),
    category_ids: z.array(z.string().cuid()),
    variations: z.array(productVariationSchema).optional(),
    images: z.array(z.string()).optional(),
    includes: z.array(z.string()).optional(),
    excludes: z.array(z.string()).optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    thumbnail: z.string().optional(),
    name: z.string().min(1).max(255).optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    category_ids: z.array(z.string().cuid()).optional(),
    variations: z.array(productVariationSchema).optional(),
    images: z.array(z.string()).optional(),
    includes: z.array(z.string()).optional(),
    excludes: z.array(z.string()).optional(),
  });
}
