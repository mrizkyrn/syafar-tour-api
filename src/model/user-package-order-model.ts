import { UserPackageOrder, UserPackage } from '@prisma/client';
import { toUserPackageResponse, UserPackageResponse } from './user-package-model';

export type UserPackageOrderResponse = {
  id: string;
  full_name: string;
  email: string;
  whatsapp_number: string;
  user_package_id: string;
  user_package: UserPackageResponse;
  created_at: Date;
  updated_at: Date;
};

export type CreateUserPackageOrderRequest = {
  full_name: string;
  email: string;
  whatsapp_number: string;
  user_package_id: string;
};

export type UserPackageOrderQueryParams = {
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  page: number;
  limit: number;
};

export function toUserPackageOrderResponse(
  order: UserPackageOrder,
  userPackage: UserPackage
): UserPackageOrderResponse {
  return {
    id: order.id,
    full_name: order.full_name,
    email: order.email,
    whatsapp_number: order.whatsapp_number,
    user_package_id: order.user_package_id,
    user_package: toUserPackageResponse(userPackage),
    created_at: order.created_at,
    updated_at: order.updated_at,
  };
}
