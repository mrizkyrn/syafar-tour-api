import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from '@prisma/client';
import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { Pageable } from '../model/page';
import {
  UserResponse,
  toUserResponse,
  UpdateUserRequest,
  UpdatePasswordRequest,
  UpdateCurrentUserRequest,
  UserQueryParams,
} from '../model/user-model';
import { Validation } from '../validation/validation';
import { UserValidation } from '../validation/user-validation';

export class UserService {
  static async getAll(queryParams: UserQueryParams): Promise<Pageable<UserResponse>> {
    const queryRequest = Validation.validate(UserValidation.QUERY, queryParams);

    const skip = (queryRequest.page - 1) * queryRequest.limit;

    const filter = {
      full_name: { contains: queryRequest.full_name },
      email: { contains: queryRequest.email },
      whatsapp_number: { contains: queryRequest.whatsapp_number },
      role: queryRequest.role,
    };

    const users = await prismaClient.user.findMany({
      where: filter,
      orderBy: {
        [queryRequest.sort || 'created_at']: queryRequest.order || 'asc',
      },
      skip,
      take: queryRequest.limit,
    });

    const total = await prismaClient.user.count({ where: filter });

    return {
      data: users.map((user) => toUserResponse(user)),
      pagination: {
        total,
        current_page: queryRequest.page,
        total_pages: Math.ceil(total / queryRequest.limit),
        limit: queryRequest.limit,
      },
    };
  }

  static async get(id: string): Promise<UserResponse> {
    const response = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!response) {
      throw new ResponseError(404, 'User tidak ditemukan');
    }

    return toUserResponse(response);
  }

  static async updateCurrent(user: User, request: UpdateCurrentUserRequest): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE_CURRENT, request);

    if (updateRequest.email) {
      const emailExists = await prismaClient.user.findFirst({
        where: { email: updateRequest.email },
      });

      if (emailExists) {
        throw new ResponseError(400, 'Email sudah terdaftar');
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

  static async updateCurrentPassword(user: User, request: UpdatePasswordRequest): Promise<UserResponse> {
    const updatePasswordRequest = Validation.validate(UserValidation.UPDATE_PASSWORD, request);

    const oldUserPassword = await prismaClient.user.findUnique({
      where: { id: user.id },
      select: { password: true },
    });

    if (!oldUserPassword) {
      throw new ResponseError(404, 'User tidak ditemukan');
    }

    const passwordMatch = await bcrypt.compare(updatePasswordRequest.old_password, oldUserPassword.password);

    if (!passwordMatch) {
      throw new ResponseError(400, 'Password lama salah');
    }

    const hashedPassword = await bcrypt.hash(updatePasswordRequest.new_password, 10);

    const updatedUser = await prismaClient.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return toUserResponse(updatedUser);
  }

  static async update(id: string, request: UpdateUserRequest): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);
    console.log(updateRequest);

    if (updateRequest.email) {
      const emailExists = await prismaClient.user.findFirst({
        where: { email: updateRequest.email },
      });

      if (emailExists) {
        throw new ResponseError(400, 'Email sudah terdaftar');
      }
    }

    await prismaClient.user.update({
      where: { id },
      data: updateRequest,
    });

    const response = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!response) {
      throw new ResponseError(404, 'User tidak ditemukan');
    }

    return toUserResponse(response);
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
      throw new ResponseError(404, 'User tidak ditemukan');
    }

    if (user.role !== 'USER') {
      throw new ResponseError(400, 'User sudah menjadi mitra');
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
