import { PackageType } from '@prisma/client';

export type PackageTypeResponse = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export function toPackageTypeResponse(packageType: PackageType): PackageTypeResponse {
  return {
    id: packageType.id,
    name: packageType.name,
    created_at: packageType.created_at,
    updated_at: packageType.updated_at,
  };
}
