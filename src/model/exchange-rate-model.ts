import { ExchangeRate } from "@prisma/client";

export type ExchangeRateResponse = {
  id: string;
  currency: string;
  rate_idr: number;
  created_at: Date;
  updated_at: Date;
};

export type CreateExchangeRateRequest = {
  currency: string;
  rate_idr: number;
};

export type BulkUpdateExchangeRateRequest = {
  id: string;
  currency: string | undefined;
  rate_idr: number | undefined;
};

export function toExchangeRateResponse(exchangeRate: ExchangeRate): ExchangeRateResponse {
  return {
    id: exchangeRate.id,
    currency: exchangeRate.currency,
    rate_idr: Number(exchangeRate.rate_idr),
    created_at: exchangeRate.created_at,
    updated_at: exchangeRate.updated_at,
  };
}
