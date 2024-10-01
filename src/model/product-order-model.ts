import { ProductOrder, User } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { toUserResponse, UserResponse } from './user-model';

export type ProductOrderResponse = {
  id: string;
  user: UserResponse;
  product_id: string;
  product_name: string;
  variation: ProductVariation | null;
  departure: Date;
  number_of_pax: number;
  per_pax_price: number;
  total_price: number;
  created_at: Date;
  updated_at: Date;
};

export type CreateProductOrderRequest = {
  product_id: string;
  variation_id?: string;
  departure: Date;
  number_of_pax: number;
  per_pax_price: number;
  total_price: number;
};

type ProductVariation = {
  id: string;
  name: string;
  price: Decimal;
};

export function toProductOrderResponse(
  productOrder: ProductOrder & {
    User: User;
    ProductVariation?: ProductVariation | null;
    Product: { name: string };
  }
): ProductOrderResponse {
  return {
    id: productOrder.id,
    user: toUserResponse(productOrder.User),
    product_id: productOrder.product_id,
    product_name: productOrder.Product.name,
    variation: productOrder.ProductVariation ?? null,
    departure: productOrder.departure,
    number_of_pax: productOrder.number_of_pax,
    per_pax_price: Number(productOrder.per_pax_price.toString()),
    total_price: Number(productOrder.total_price.toString()),
    created_at: productOrder.created_at,
    updated_at: productOrder.updated_at,
  };
}
