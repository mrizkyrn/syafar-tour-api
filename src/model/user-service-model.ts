export type UserServiceResponse = {
  id: string;
  service_type: string;
  service_name: string;
  service_price: number;
  created_at: Date;
  updated_at: Date;
};

export type BulkUpdateRequest = {
  type: string;
  data: {
    id: string;
    service_name?: string;
    service_price?: number;
  }[];
};

export type GetByTypeRequest = {
  type: string;
};

export function toUserServiceResponse(service: any): UserServiceResponse {
  return {
    id: service.id,
    service_type: service.ServiceType.name,
    service_name: service.service_name,
    service_price: parseFloat(service.service_price),
    created_at: service.created_at,
    updated_at: service.updated_at,
  };
}
