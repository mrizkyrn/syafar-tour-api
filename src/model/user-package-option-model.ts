import { UserPackageOption } from '@prisma/client';

export type UserPackageOptionResponse = {
  id: string;
  package_option_id: string;
  package_option_name: string;
  name: string;
  price: number;
  order_number: number;
  created_at: Date;
  updated_at: Date;
};

export type BulkUpdateRequest = {
  type: string;
  modifiedData: {
    order_number: any;
    id: string;
    name: string;
    price: number;
  }[];
  deletedData: string[];
};

export function toUserPackageOptionResponse(
  data: UserPackageOption & { PackageType: { name: string } }
): UserPackageOptionResponse {
  return {
    id: data.id,
    package_option_id: data.package_type_id,
    package_option_name: data.PackageType.name,
    name: data.name,
    price: Number(data.price),
    order_number: data.order_number,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}
