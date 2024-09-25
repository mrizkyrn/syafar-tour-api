import { Order } from '@prisma/client';

// id            String   @id @default(cuid())
//   user_id       String
//   product_id    String
//   variation_id  String
//   departure     DateTime
//   number_of_pax Int
//   per_pax_price Decimal  @db.Decimal(10, 2)
//   total_price   Decimal  @db.Decimal(10, 2)
//   created_at    DateTime @default(now())
//   updated_at    DateTime @updatedAt

export type OrderResponse = {
  id: string;
  user_id: string;
  product_id: string;
  variation: string;
  departure: Date;
  number_of_pax: number;
  per_pax_price: number;
  total_price: number;
  created_at: Date;
  updated_at: Date;
};

export type CreateOrderRequest = {
  product_id: string;
  variation: string;
  departure: Date;
  number_of_pax: number;
  per_pax_price: number;
  total_price: number;
};

export function toOrderResponse(order: Order): OrderResponse {
  return {
    id: order.id,
    user_id: order.user_id,
    product_id: order.product_id,
    variation: order.variation,
    departure: order.departure,
    number_of_pax: order.number_of_pax,
    per_pax_price: parseFloat(order.per_pax_price.toString()),
    total_price: parseFloat(order.total_price.toString()),
    created_at: order.created_at,
    updated_at: order.updated_at,
  };
}