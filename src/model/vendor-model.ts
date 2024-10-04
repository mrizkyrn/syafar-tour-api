export type VendorResponse = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type CreateVendorRequest = {
  name: string;
};

export type UpdateVendorRequest = {
  name: string;
};

export function toVendorResponse(vendor: any): VendorResponse {
  return {
    id: vendor.id,
    name: vendor.name,
    created_at: vendor.created_at,
    updated_at: vendor.updated_at,
  };
}