import { z, ZodType } from 'zod';

const productVariationSchema = z.object({
  name: z.string({ required_error: 'Nama variasi produk harus diisi' }).min(1).max(255),
  price: z.number({ required_error: 'Harga variasi produk harus diisi' }),
});

export class ProductValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string({ required_error: 'Nama produk harus diisi' }).min(1).max(255),
    description: z.string().optional(),
    price: z.number().optional(),
    has_variation: z.boolean(),
    thumbnails: z.array(z.string()).optional(),
    category_ids: z.array(z.string().cuid()).optional(),
    variations: z.array(productVariationSchema).optional(),
    includes: z.array(z.string()).optional(),
    excludes: z.array(z.string()).optional(),
  });

  static readonly QUERY: ZodType = z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    category_id: z.array(z.string().cuid()).optional(),
    has_variation: z.boolean().optional(),
    sort: z.string().optional(),
    order: z.string().optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(255).optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    has_variation: z.boolean().optional(),
    thumbnails: z.array(z.string()).optional(),
    category_ids: z.array(z.string().cuid()).optional(),
    variations: z.array(productVariationSchema).optional(),
    includes: z.array(z.string()).optional(),
    excludes: z.array(z.string()).optional(),
  });
}
