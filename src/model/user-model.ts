import { User } from '@prisma/client';

export type UserResponse = {
  id: string;
  full_name: string;
  email: string;
  whatsapp_number: string;
  role: string;
  token?: string;
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

export type UpdateUserRequest = {
  full_name?: string;
  email?: string;
  whatsapp_number?: string;
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
  };
}
