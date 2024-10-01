import { Category } from '@prisma/client';

export type CategoryResponse = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type CreateCategoryRequest = {
  name: string;
};

export type UpdateCategoryRequest = {
  name: string;
};

export function toCategoryResponse(category: Category): CategoryResponse {
  return {
    id: category.id,
    name: category.name,
    created_at: category.created_at,
    updated_at: category.updated_at,
  };
}
