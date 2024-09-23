export type UserServiceResponse = {
  id: string;
  service_type: string;
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

export type GetByTypeRequest = {
  type: string;
};

export function toUserServiceResponse(service: any): UserServiceResponse {
  return {
    id: service.id,
    service_type: service.ServiceType.name,
    name: service.name,
    price: parseFloat(service.price),
    order_number: service.order_number,
    created_at: service.created_at,
    updated_at: service.updated_at,
  };
}
