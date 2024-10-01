import { Category } from '@prisma/client';

export type CategoryResponse = {
  id: string;
  name: string;
  has_variation: boolean;
  created_at: Date;
  updated_at: Date;
};

export type CreateCategoryRequest = {
  name: string;
  has_variation: boolean;
};

export type UpdateCategoryRequest = {
  name: string;
  has_variation: boolean;
};

export function toCategoryResponse(category: Category): CategoryResponse {
  return {
    id: category.id,
    name: category.name,
    has_variation: category.has_variation,
    created_at: category.created_at,
    updated_at: category.updated_at,
  };
}
