import express from 'express';
import { AuthController } from '../controller/auth-controller';
import { CategoryController } from '../controller/category-controller';
import { ContactController } from '../controller/contact-controller';
import { ExchangeRateController } from '../controller/exchange-rate-controller';
import { PackageTypeController } from '../controller/package-type-controller';
import { ProductController } from '../controller/product-controller';
import { UserPackageController } from '../controller/user-package-controller';
import { UserPackageOptionController } from '../controller/user-package-option-controller';
import { UserPackageOrderController } from '../controller/user-package-order-controller';
import { HotelController } from '../controller/hotel-controller';

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
publicRouter.get('/v1/categories', CategoryController.getAll);
publicRouter.get('/v1/categories/:id', CategoryController.get);

// Product
publicRouter.get('/v1/products', ProductController.getAll);
publicRouter.get('/v1/products/:id', ProductController.get);

// Hotel
publicRouter.get('/v1/hotels/prices', HotelController.getAllHotelPeriodPrices);

// Exchange Rate
publicRouter.get('/v1/exchange-rates', ExchangeRateController.getAll);
publicRouter.get('/v1/exchange-rates/:id', ExchangeRateController.get);

// Contact
publicRouter.get('/v1/contacts', ContactController.getAll);
publicRouter.get('/v1/contacts/:name', ContactController.getByName);