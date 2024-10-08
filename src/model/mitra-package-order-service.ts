import { MitraPackageOrder, User } from '@prisma/client';
import { MitraPackageResponse, toMitraPackageResponse } from './mitra-package-model';
import { toUserResponse, UserResponse } from './user-model';

export type MitraPackageOrderResponse = {
  id: string;
  user: UserResponse;
  mitra_package: MitraPackageResponse;
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
  order: MitraPackageOrder,
  user: User,
  mitraPackage: any
): MitraPackageOrderResponse {
  return {
    id: order.id,
    user: toUserResponse(user),
    mitra_package: toMitraPackageResponse(mitraPackage),
    created_at: order.created_at,
    updated_at: order.updated_at,
  };
}
