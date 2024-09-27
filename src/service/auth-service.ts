import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { LoginUserRequest, RegisterUserRequest, UserResponse, toUserResponse } from '../model/user-model';
import { Validation } from '../validation/validation';
import { AuthValidation } from '../validation/auth-validation';

export class AuthService {
  static async register(request: RegisterUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(AuthValidation.REGISTER, request);

    const emailExists = await prismaClient.user.findFirst({
      where: { email: registerRequest.email },
    });

    if (emailExists) {
      throw new ResponseError(400, 'Email already exists');
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(AuthValidation.LOGIN, request);

    const user = await prismaClient.user.findUnique({
      where: { email: loginRequest.email },
    });

    if (!user) {
      throw new ResponseError(400, 'Invalid username or password');
    }

    const passwordMatch = await bcrypt.compare(loginRequest.password, user.password);

    if (!passwordMatch) {
      throw new ResponseError(400, 'Invalid username or password');
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        whatsapp_number: user.whatsapp_number,
        role: user.role,
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
}
