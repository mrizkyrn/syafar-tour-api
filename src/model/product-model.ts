import { Product } from '@prisma/client';

export type ProductResponse = {
  id: string;
  thumbnail: string;
  name: string;
  description: string;
  price: number;
  categories: Category[];
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
  category_ids: string[];
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

type Category = {
  id: string;
  name: string;
};

type Variation = {
  id: string;
  name: string;
  price: number;
};

export function toProductResponse(product: any): ProductResponse {
  return {
    id: product.id,
    thumbnail: product.thumbnail,
    name: product.name,
    description: product.description,
    price: parseFloat(product.price),
    categories:
      product.ProductCategories?.map((productCategory: any) => ({
        id: productCategory.Category.id,
        name: productCategory.Category.name,
      })) || [],
    variations:
      product.ProductVariations?.map((variation: Variation) => ({
        id: variation.id,
        name: variation.name,
        price: variation.price,
      })) || [],
    images: product.ProductImages?.map((image: any) => image.image_url) || [],
    includes: product.ProductInclude?.map((include: any) => include.point) || [],
    excludes: product.ProductExclude?.map((exclude: any) => exclude.point) || [],
    created_at: product.created_at,
    updated_at: product.updated_at,
  };
}
