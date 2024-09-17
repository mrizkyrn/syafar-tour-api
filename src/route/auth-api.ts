import express from 'express';
import { AuthController } from '../controller/auth-controller';
import { authMiddleware } from '../middleware/auth-middleware';

export const authApi = express.Router();
authApi.use(authMiddleware);

authApi.get('/v1/auth/me', AuthController.me);
authApi.post('/v1/auth/logout', AuthController.logout);

