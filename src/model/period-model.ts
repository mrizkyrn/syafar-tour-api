import { Period } from "@prisma/client";

type PeriodCategory = 'LOW' | 'MID' | 'HIGH' | 'RAMADHAN' | 'ITIKAF';

export type PeriodResponse = {
  id: string;
  category: PeriodCategory;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;
};

export type CreatePeriodRequest = {
  category: PeriodCategory;
  start_date: Date;
  end_date: Date;
};

export type UpdatePeriodRequest = CreatePeriodRequest;

export function toPeriodResponse(period: Period): PeriodResponse {
  return {
    id: period.id,
    category: period.category ?? '',
    start_date: period.start_date,
    end_date: period.end_date,
    created_at: period.created_at,
    updated_at: period.updated_at,
  };
}