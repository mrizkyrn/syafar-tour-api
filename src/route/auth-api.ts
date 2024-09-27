import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware';
import { permit } from '../middleware/permit-middleware';
import { AuthController } from '../controller/auth-controller';
import { UserController } from '../controller/user-controller';
import { UserServiceController } from '../controller/user-service-controller';
import { CategoryController } from '../controller/category-controller';
import { ProductController } from '../controller/product-controller';
import { OrderController } from '../controller/order-controller';
import { upload } from '../middleware/multer-middleware';

export const authApi = express.Router();

authApi.use(authMiddleware);

// Authentication
authApi.post('/v1/auth/logout', AuthController.logout);

// User
authApi.get('/v1/user', permit('ADMIN'), UserController.getAll);
authApi.get('/v1/user/current', UserController.getCurrent);
authApi.get('/v1/user/:id', permit('ADMIN'), UserController.get);
authApi.get('/v1/user/role/:role', permit('ADMIN'), UserController.getByRole);
authApi.patch('/v1/user/current', UserController.updateCurrent);
authApi.patch('/v1/user/current/password', UserController.updateCurrentPassword);
authApi.patch('/v1/user/:id', permit('ADMIN'), UserController.update);
authApi.patch('/v1/user/upgrade/:id', UserController.upgradeToMitra);
authApi.delete('/v1/user/:id', permit('ADMIN'), UserController.delete);

// User Service
authApi.post('/v1/user-service/bulk', permit('ADMIN'), UserServiceController.bulkUpdate);
authApi.get('/v1/user-service/:type', UserServiceController.getByType);

// Category
authApi.post('/v1/category', permit('ADMIN'), CategoryController.create);
authApi.put('/v1/category/:id', permit('ADMIN'), CategoryController.update);
authApi.delete('/v1/category/:id', permit('ADMIN'), CategoryController.delete);

// Product
authApi.post(
  '/v1/product',
  permit('ADMIN'),
  upload.fields([{ name: 'thumbnail', maxCount: 1 }]),
  ProductController.create
);
authApi.patch(
  '/v1/product/:id',
  permit('ADMIN'),
  upload.fields([{ name: 'thumbnail', maxCount: 1 }]),
  ProductController.update
);
authApi.delete('/v1/product/:id', permit('ADMIN'), ProductController.delete);

// Order
authApi.get('/v1/order', permit('ADMIN'), OrderController.getAll);
authApi.get('/v1/order/:id', OrderController.get);
authApi.post('/v1/order', OrderController.create);
