import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware';
import { AuthController } from '../controller/auth-controller';
import { UserServiceController } from '../controller/user-service-controller';

export const authApi = express.Router();
authApi.use(authMiddleware);

authApi.get('/v1/auth/me', AuthController.me);
authApi.post('/v1/auth/logout', AuthController.logout);

authApi.patch('/v1/user-service/bulk', UserServiceController.bulkUpdate);
authApi.get('/v1/user-service/:type', UserServiceController.getByType);