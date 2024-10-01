import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware';
import { upload } from '../middleware/multer-middleware';
import { permit } from '../middleware/permit-middleware';
import { AuthController } from '../controller/auth-controller';
import { CategoryController } from '../controller/category-controller';
import { UserController } from '../controller/user-controller';
import { ProductController } from '../controller/product-controller';
import { ProductOrderController } from '../controller/product-order-controller';
import { UserPackageOptionController } from '../controller/user-package-option-controller';
import { UserPackageOrderController } from '../controller/user-package-order-controller';

export const authApi = express.Router();

authApi.use(authMiddleware);

// Authentication
authApi.post('/v1/auth/logout', AuthController.logout);

// User
authApi.post('/v1/users', permit('ADMIN'), UserController.create);
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
authApi.post('/v1/categories', permit('ADMIN'), CategoryController.create);
authApi.put('/v1/categories/:id', permit('ADMIN'), CategoryController.update);
authApi.delete('/v1/categories/:id', permit('ADMIN'), CategoryController.delete);

// Product
authApi.post(
  '/v1/products',
  permit('ADMIN'),
  upload.fields([{ name: 'thumbnails', maxCount: 3 }]),
  ProductController.create
);
authApi.patch(
  '/v1/products/:id',
  permit('ADMIN'),
  upload.fields([{ name: 'thumbnails', maxCount: 3 }]),
  ProductController.update
);
authApi.delete('/v1/products/:id', permit('ADMIN'), ProductController.delete);

// Order
authApi.get('/v1/product-orders', permit('ADMIN'), ProductOrderController.getAll);
authApi.delete('/v1/product-orders/:id', permit('ADMIN'), ProductOrderController.delete);
authApi.post('/v1/product-orders', ProductOrderController.create);
