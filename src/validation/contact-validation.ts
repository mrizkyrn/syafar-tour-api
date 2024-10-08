import { z, ZodType } from 'zod';

export class ContactValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string({ message: 'Nama harus diisi' }),
    value: z.string({ message: 'Nilai harus diisi' }),
  });

  static readonly BULK_UPDATE: ZodType = z.array(
    z.object({
      id: z.string({ message: 'ID tidak boleh kosong' }),
      name: z.string().optional(),
      value: z.string().optional(),
    })
  );
}
