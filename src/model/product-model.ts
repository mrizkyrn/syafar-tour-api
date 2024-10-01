import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export type ProductResponse = {
  id: string;
  name: string;
  description: string;
  price: number;
  has_variation: boolean;
  thumbnails: Thumbnail[];
  categories: Category[];
  variations: Variation[];
  includes: IncludeExclude[];
  excludes: IncludeExclude[];
  created_at: Date;
  updated_at: Date;
};

export type CreateProductRequest = {
  name: string;
  description?: string;
  price?: number;
  has_variation: boolean;
  thumbnails?: string[];
  category_ids?: string[];
  variations?: { name: string; price: number }[];
  includes?: string[];
  excludes?: string[];
};

export type ProductQueryParams = {
  name?: string;
  category_id?: string[];
  has_variation?: boolean;
  sort?: string;
  order?: 'asc' | 'desc';
  page: number;
  limit: number;
};

export type UpdateProductRequest = {
  name?: string;
  description?: string;
  price?: number;
  has_variation: boolean;
  thumbnails?: string[];
  category_ids?: string[];
  variations?: { name: string; price: number }[];
  includes?: string[];
  excludes?: string[];
};

type Thumbnail = {
  id: string;
  image_url: string;
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

type IncludeExclude = {
  id: string;
  description: string;
};

export function toProductResponse(
  product: Product & {
    ProductThumbnails: { id: string; image_url: string }[];
    ProductCategories: { Category: { id: string; name: string } }[];
    ProductVariations: { id: string; name: string; price: Decimal }[];
    ProductIncludes: { id: string; description: string }[];
    ProductExcludes: { id: string; description: string }[];
  }
): ProductResponse {
  return {
    id: product.id,
    name: product.name,
    description: product.description ?? '',
    price: product.price.toNumber(),
    has_variation: product.has_variation,
    thumbnails: product.ProductThumbnails.map((thumbnail) => ({
      id: thumbnail.id,
      image_url: thumbnail.image_url,
    })),
    categories: product.ProductCategories.map((category) => ({
      id: category.Category.id,
      name: category.Category.name,
    })),
    variations: product.ProductVariations.map((variation) => ({
      id: variation.id,
      name: variation.name,
      price: variation.price.toNumber(),
    })),
    includes: product.ProductIncludes.map((include) => ({
      id: include.id,
      description: include.description,
    })),
    excludes: product.ProductExcludes.map((exclude) => ({
      id: exclude.id,
      description: exclude.description,
    })),
    created_at: product.created_at,
    updated_at: product.updated_at,
  };
}
