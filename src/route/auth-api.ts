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
import { VendorController } from '../controller/vendor-controller';
import { HotelController } from '../controller/hotel-controller';
import { PeriodController } from '../controller/period-controller';

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

// Vendor
authApi.post('/v1/vendors', permit('ADMIN'), VendorController.create);
authApi.get('/v1/vendors', permit('ADMIN'), VendorController.getAll);
authApi.get('/v1/vendors/:id', permit('ADMIN'), VendorController.getById);
authApi.put('/v1/vendors/:id', permit('ADMIN'), VendorController.update);
authApi.delete('/v1/vendors/:id', permit('ADMIN'), VendorController.delete);

// Hotel
authApi.post('/v1/hotels', permit('ADMIN'), HotelController.create);
authApi.get('/v1/hotels', permit('ADMIN'), HotelController.getAll);
authApi.get('/v1/hotels/:id', permit('ADMIN'), HotelController.getById);
authApi.put('/v1/hotels/:id', permit('ADMIN'), HotelController.update);
authApi.post('/v1/hotels/bulk', permit('ADMIN'), HotelController.bulkUpdate);
authApi.delete('/v1/hotels/:id', permit('ADMIN'), HotelController.delete);

// Period
authApi.post('/v1/periods', permit('ADMIN'), PeriodController.create);
authApi.get('/v1/periods', permit('ADMIN'), PeriodController.getAll);
authApi.get('/v1/periods/:id', permit('ADMIN'), PeriodController.getById);
authApi.put('/v1/periods/:id', permit('ADMIN'), PeriodController.update);
authApi.delete('/v1/periods/:id', permit('ADMIN'), PeriodController.delete);