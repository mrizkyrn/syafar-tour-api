import express from 'express';
import { AuthController } from '../controller/auth-controller';
import { CategoryController } from '../controller/category-controller';
import { PackageTypeController } from '../controller/package-type-controller';
import { ProductController } from '../controller/product-controller';
import { UserPackageController } from '../controller/user-package-controller';
import { UserPackageOptionController } from '../controller/user-package-option-controller';
import { UserPackageOrderController } from '../controller/user-package-order-controller';

export const publicRouter = express.Router();

// Authentication
publicRouter.post('/v1/auth/register', AuthController.register);
publicRouter.post('/v1/auth/login', AuthController.login);

// Package Type
publicRouter.get('/v1/package-types', PackageTypeController.getAll);

// User Package
publicRouter.post('/v1/user-packages', UserPackageController.create);
publicRouter.get('/v1/user-packages/:id', UserPackageController.get);

// User Package Option
publicRouter.get('/v1/user-package-options', UserPackageOptionController.getAll);

// User Package Order
publicRouter.post('/v1/user-package-orders', UserPackageOrderController.create);

// Category
publicRouter.get('/v1/category', CategoryController.getAll);
publicRouter.get('/v1/category/:id', CategoryController.get);

// Product
publicRouter.get('/v1/product', ProductController.getAll);
publicRouter.get('/v1/product/:id', ProductController.get);