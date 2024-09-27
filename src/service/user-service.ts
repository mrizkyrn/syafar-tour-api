import jwt from 'jsonwebtoken';

import { prismaClient } from '../application/database';
import { Role, User } from '@prisma/client';
import { ResponseError } from '../error/response-error';
import { UserResponse, toUserResponse, UpdateUserRequest } from '../model/user-model';
import { Validation } from '../validation/validation';
import { UserValidation } from '../validation/user-validation';

export class UserService {
  static async getAll(): Promise<UserResponse[]> {
    const response = await prismaClient.user.findMany({
      where: { role: { not: 'ADMIN' } },
    });
    return response.map((user) => toUserResponse(user));
  }

  static async get(id: string): Promise<UserResponse> {
    const response = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!response) {
      throw new ResponseError(404, 'User not found');
    }

    return toUserResponse(response);
  }

  static async getByRole(role: Role): Promise<UserResponse[]> {
    const response = await prismaClient.user.findMany({
      where: { role },
    });

    return response.map((user) => toUserResponse(user));
  }

  static async updateCurrent(user: User, request: UpdateUserRequest): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    if (updateRequest.email) {
      const emailExists = await prismaClient.user.findFirst({
        where: { email: updateRequest.email },
      });

      if (emailExists) {
        throw new ResponseError(400, 'Email already exists');
      }
    }

    await prismaClient.user.update({
      where: { id: user.id },
      data: updateRequest,
    });

    const updatedUser = await prismaClient.user.findUnique({
      where: { id: user.id },
    });

    const token = jwt.sign(
      {
        id: updatedUser?.id,
        email: updatedUser?.email,
        full_name: updatedUser?.full_name,
        whatsapp_number: updatedUser?.whatsapp_number,
        role: updatedUser?.role,
      },
      String(process.env.JWT_SECRET),
      {
        expiresIn: 60 * 60 * 24, // 24 hours
      }
    );

    const response = toUserResponse(user);
    response.token = token;
    return response;
  }

  static async delete(id: string): Promise<UserResponse> {
    const response = await prismaClient.user.delete({
      where: { id },
    });

    return toUserResponse(response);
  }

  static async upgradeToMitra(id: string): Promise<UserResponse> {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new ResponseError(404, 'User not found');
    }

    if (user.role !== 'USER') {
      throw new ResponseError(400, 'User is not a user');
    }

    await prismaClient.user.update({
      where: { id },
      data: { role: 'MITRA' },
    });

    const updatedUser = await prismaClient.user.findUnique({
      where: { id },
    });

    const token = jwt.sign(
      {
        id: updatedUser?.id,
        email: updatedUser?.email,
        full_name: updatedUser?.full_name,
        whatsapp_number: updatedUser?.whatsapp_number,
        role: updatedUser?.role,
      },
      String(process.env.JWT_SECRET),
      {
        expiresIn: 60 * 60 * 24, // 24 hours
      }
    );

    if (!updatedUser) {
      throw new ResponseError(404, 'Updated user not found');
    }

    updatedUser.role = 'MITRA';
    
    const response = toUserResponse(user);
    response.token = token;
    return response;
  }
}
