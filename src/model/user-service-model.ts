import { Decimal } from '@prisma/client/runtime/library';


export type UserServiceResponse = {
  id: string;
  service_type: string;
  service_name: string;
  service_price: Decimal;
  created_at: Date;
  updated_at: Date;
};

export type BulkUpdateRequest = {
  id: string;
  service_name?: string;
  service_price?: Decimal;
};

export type GetByTypeRequest = {
  type: string;
};

export function toUserServiceResponse(service: any): UserServiceResponse {
  return {
    id: service.id,
    service_type: service.ServiceType.name,
    service_name: service.service_name,
    service_price: service.service_price,
    created_at: service.created_at,
    updated_at: service.updated_at,
  };
}
