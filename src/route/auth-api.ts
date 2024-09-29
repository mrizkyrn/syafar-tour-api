import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware';
import { upload } from '../middleware/multer-middleware';
import { permit } from '../middleware/permit-middleware';
import { AuthController } from '../controller/auth-controller';
import { UserController } from '../controller/user-controller';
import { CategoryController } from '../controller/category-controller';
import { ProductController } from '../controller/product-controller';
import { OrderController } from '../controller/order-controller';
import { UserPackageOptionController } from '../controller/user-package-option-controller';
import { UserPackageOrderController } from '../controller/user-package-order-controller';

export const authApi = express.Router();

authApi.use(authMiddleware);

// Authentication
authApi.post('/v1/auth/logout', AuthController.logout);

// User
authApi.get('/v1/users', permit('ADMIN'), UserController.getAll);
authApi.get('/v1/users/current', UserController.getCurrent);
authApi.get('/v1/users/:id', permit('ADMIN'), UserController.get);
authApi.patch('/v1/users/current', UserController.updateCurrent);
authApi.patch('/v1/users/current/password', UserController.updateCurrentPassword);
authApi.patch('/v1/users/:id', permit('ADMIN'), UserController.update);
authApi.patch('/v1/users/upgrade/:id', UserController.upgradeToMitra);
authApi.delete('/v1/users/:id', permit('ADMIN'), UserController.delete);

// User Package Option
authApi.post('/v1/user-package-options/bulk', permit('ADMIN'), UserPackageOptionController.bulkUpdate);
authApi.get('/v1/user-package-options/:type', permit('ADMIN'), UserPackageOptionController.getByType);

// User Package Order
authApi.get('/v1/user-package-orders', permit('ADMIN'), UserPackageOrderController.getAll);
authApi.delete('/v1/user-package-orders/:id', permit('ADMIN'), UserPackageOrderController.delete);

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
