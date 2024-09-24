import { Product } from "@prisma/client";

export type ProductResponse = {
  id: string;
  thumbnail: string;
  name: string;
  description: string;
  price: number;
  categories: string[];
  variations?: Variation[];
  images?: string[];
  includes?: string[];
  excludes?: string[];
  created_at: Date;
  updated_at: Date;
};

export type CreateProductRequest = {
  thumbnail: string;
  name: string;
  description: string;
  price: number;
  category_ids: string[]
  variations?: Variation[];
  images?: string[];
  includes?: string[];
  excludes?: string[];
};

export type UpdateProductRequest = {
  thumbnail?: string;
  name: string;
  description: string;
  price: number;
  category_ids: string[];
  variations?: Variation[];
  images?: string[];
  includes?: string[];
  excludes?: string[];
};

type Variation = {
  name: string;
  price: number;
};

type includeExclude = {
  point: string;
};

type ProductImage = {
  image_url: string;
};


export function toProductResponse(product: any): ProductResponse {
  return {
    id: product.id,
    thumbnail: product.thumbnail,
    name: product.name,
    description: product.description,
    price: parseFloat(product.price),
    categories: product.ProductCategories?.map((cat: any) => cat.Category.name) || [], // Maps category names
    variations: product.ProductVariations?.map((variation: any) => ({
      name: variation.name,
      price: variation.price,
    })) || [], // Maps variations, empty array if none
    images: product.ProductImages?.map((image: any) => image.image_url) || [], // Maps image URLs
    includes: product.ProductInclude?.map((include: any) => include.point) || [], // Maps include points
    excludes: product.ProductExclude?.map((exclude: any) => exclude.point) || [], // Maps exclude points
    created_at: product.created_at,
    updated_at: product.updated_at,
  };
}
