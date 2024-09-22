import { ServiceType } from '@prisma/client';

export type ServiceTypeResponse = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export function toServiceTypeResponse(serviceType: ServiceType): ServiceTypeResponse {
  return {
    id: serviceType.id,
    name: serviceType.name,
    created_at: serviceType.created_at,
    updated_at: serviceType.updated_at,
  };
}
