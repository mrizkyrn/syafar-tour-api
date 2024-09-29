import { User } from '@prisma/client';

export type UserResponse = {
  id: string;
  full_name: string;
  email: string;
  whatsapp_number: string;
  role: string;
  token?: string;
  created_at: Date;
  updated_at: Date;
};

export type RegisterUserRequest = {
  full_name: string;
  email: string;
  whatsapp_number: string;
  password: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type CreateUserRequest = {
  full_name: string;
  email: string;
  whatsapp_number: string;
  password: string;
  role: 'USER' | 'MITRA' | 'ADMIN';
};

export type UserQueryParams = {
  full_name?: string;
  email?: string;
  whatsapp_number?: string;
  role?: 'USER' | 'MITRA' | 'ADMIN';
  sort?: string;
  order?: 'asc' | 'desc';
  page: number;
  limit: number;
};

export type UpdateCurrentUserRequest = {
  full_name?: string;
  email?: string;
  whatsapp_number?: string;
};

export type UpdateUserRequest = {
  full_name?: string;
  email?: string;
  whatsapp_number?: string;
  role?: 'USER' | 'MITRA' | 'ADMIN';
};

export type UpdatePasswordRequest = {
  old_password: string;
  new_password: string;
};

export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    whatsapp_number: user.whatsapp_number,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}
