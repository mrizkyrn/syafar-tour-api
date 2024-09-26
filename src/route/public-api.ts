import express from 'express';
import { AuthController } from '../controller/auth-controller';
import { CalculationController } from '../controller/calculation-controller';
import { UserServiceController } from '../controller/user-service-controller';
import { ServiceTypeController } from '../controller/service-type-controller';
import { CategoryController } from '../controller/category-controller';
import { ProductController } from '../controller/product-controller';

export const publicRouter = express.Router();

publicRouter.post('/v1/auth/register', AuthController.register);
publicRouter.post('/v1/auth/login', AuthController.login);

publicRouter.post('/v1/calculation', CalculationController.create);
publicRouter.get('/v1/calculation/:id', CalculationController.get);

publicRouter.get('/v1/service-type', ServiceTypeController.getAll);

publicRouter.get('/v1/user-service', UserServiceController.getAll);

publicRouter.get('/v1/category', CategoryController.getAll);
publicRouter.get('/v1/category/:id', CategoryController.get);

publicRouter.get('/v1/product', ProductController.getAll);
publicRouter.get('/v1/product/:id', ProductController.get);