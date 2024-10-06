export type MitraPackageOptionResponse = {
  id: string;
  name: string;
  price_idr: number;
  order_number: number;
  created_at: Date;
  updated_at: Date;
};

export type BulkUpdateMitraPackageOptionRequest = {
  created: {
    name: string;
    price_idr: number;
    order_number: number;
  }[];
  modified: {
    id: string;
    name: string;
    price_idr: number;
    order_number: number;
  }[];
  deleted: string[];
};

export function toMitraPackageOptionResponse(mitraPackageOption: any): MitraPackageOptionResponse {
  return {
    id: mitraPackageOption.id,
    name: mitraPackageOption.name,
    price_idr: mitraPackageOption.price_idr,
    order_number: mitraPackageOption.order_number,
    created_at: mitraPackageOption.created_at,
    updated_at: mitraPackageOption.updated_at,
  };
}