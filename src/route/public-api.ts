import express from 'express';
import { AuthController } from '../controller/auth-controller';

export const publicRouter = express.Router();

publicRouter.post('/v1/auth/register', AuthController.register);
publicRouter.post('/v1/auth/login', AuthController.login);
