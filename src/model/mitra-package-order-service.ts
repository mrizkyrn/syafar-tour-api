import { MitraPackageOrder, User } from '@prisma/client';
import { toUserResponse, UserResponse } from './user-model';
import { Decimal } from '@prisma/client/runtime/library';

export type MitraPackageOrderResponse = {
  id: string;
  user: UserResponse;
  mitra_package_id: string;
  per_pax_price: number;
  total_price: number;
  created_at: Date;
  updated_at: Date;
};

export type CreateMitraPackageOrderRequest = {
  mitra_package_id: string;
};

export type MitraPackageOrderQueryParams = {
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  page: number;
  limit: number;
};

export function toMitraPackageOrderResponse(
  order: MitraPackageOrder & { User: User, MitraPackage: { per_pax_price: Decimal, total_price: Decimal } },
): MitraPackageOrderResponse {
  return {
    id: order.id,
    user: toUserResponse(order.User),
    mitra_package_id: order.mitra_package_id,
    per_pax_price: Number(order.MitraPackage.per_pax_price),
    total_price: Number(order.MitraPackage.total_price),
    created_at: order.created_at,
    updated_at: order.updated_at,
  };
}
