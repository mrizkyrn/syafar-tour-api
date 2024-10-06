import { z, ZodType } from 'zod';

export class MitraPackageOptionValidation {
  static readonly BULK_UPDATE: ZodType = z.object({
    created: z.array(
      z.object({
        name: z.string(),
        price_idr: z.number(),
        order_number: z.number(),
      })
    ),
    modified: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        price_idr: z.number(),
        order_number: z.number(),
      })
    ),
    deleted: z.array(z.string()),
  });
}
