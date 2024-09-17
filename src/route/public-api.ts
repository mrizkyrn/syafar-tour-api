import express from 'express';
import { AuthController } from '../controller/auth-controller';
import { PriceController } from '../controller/price-controller';
import { CalculationController } from '../controller/calculation-controller';

export const publicRouter = express.Router();

publicRouter.post('/v1/auth/register', AuthController.register);
publicRouter.post('/v1/auth/login', AuthController.login);

publicRouter.get('/v1/price/:name', PriceController.getAll);
publicRouter.patch('/v1/price/:name/bulk', PriceController.bulkUpdate);

publicRouter.post('/v1/calculation', CalculationController.create);
publicRouter.get('/v1/calculation/:id', CalculationController.get);