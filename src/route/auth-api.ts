import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware';
import { upload } from '../middleware/multer-middleware';
import { permit } from '../middleware/permit-middleware';
import { AuthController } from '../controller/auth-controller';
import { CategoryController } from '../controller/category-controller';
import { ContactController } from '../controller/contact-controller';
import { UserController } from '../controller/user-controller';
import { ExchangeRateController } from '../controller/exchange-rate-controller';
import { ProductController } from '../controller/product-controller';
import { ProductOrderController } from '../controller/product-order-controller';
import { UserPackageOptionController } from '../controller/user-package-option-controller';
import { UserPackageOrderController } from '../controller/user-package-order-controller';
import { VendorController } from '../controller/vendor-controller';
import { HotelController } from '../controller/hotel-controller';
import { PeriodController } from '../controller/period-controller';
import { MitraPackageOptionController } from '../controller/mitra-package-option-controller';
import { MitraPackageController } from '../controller/mitra-package-controller';
import { MitraPackageOrderController } from '../controller/mitra-package-order-controller';

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

// Product Order
authApi.get('/v1/product-orders', permit('ADMIN'), ProductOrderController.getAll);
authApi.delete('/v1/product-orders/:id', permit('ADMIN'), ProductOrderController.delete);
authApi.post('/v1/product-orders', ProductOrderController.create);
authApi.get('/v1/product-orders/user', ProductOrderController.getAllByUser);

// Vendor
authApi.post('/v1/vendors', permit('ADMIN'), VendorController.create);
authApi.get('/v1/vendors', permit('ADMIN', 'MITRA'), VendorController.getAll);
authApi.get('/v1/vendors/:id', permit('ADMIN', 'MITRA'), VendorController.getById);
authApi.put('/v1/vendors/:id', permit('ADMIN'), VendorController.update);
authApi.delete('/v1/vendors/:id', permit('ADMIN'), VendorController.delete);

// Hotel
authApi.post('/v1/hotels', permit('ADMIN'), HotelController.create);
authApi.get('/v1/hotels', permit('ADMIN', 'MITRA'), HotelController.getAll);
authApi.get('/v1/hotels/:id', permit('ADMIN', 'MITRA'), HotelController.getById);
authApi.put('/v1/hotels/:id', permit('ADMIN'), HotelController.update);
authApi.post('/v1/hotels/bulk', permit('ADMIN'), HotelController.bulkUpdate);
authApi.delete('/v1/hotels/:id', permit('ADMIN'), HotelController.delete);

// Period
authApi.post('/v1/periods', permit('ADMIN'), PeriodController.create);
authApi.get('/v1/periods', permit('ADMIN', 'MITRA'), PeriodController.getAll);
authApi.get('/v1/periods/:id', permit('ADMIN', 'MITRA'), PeriodController.getById);
authApi.put('/v1/periods/:id', permit('ADMIN'), PeriodController.update);
authApi.delete('/v1/periods/:id', permit('ADMIN'), PeriodController.delete);

// Mitra Package Option
authApi.post('/v1/mitra-packages/airlines/bulk', permit('ADMIN'), MitraPackageOptionController.bulkUpdateAirline);
authApi.post('/v1/mitra-packages/visas/bulk', permit('ADMIN'), MitraPackageOptionController.bulkUpdateVisas);
authApi.post(
  '/v1/mitra-packages/transportations/bulk',
  permit('ADMIN'),
  MitraPackageOptionController.bulkUpdateTranportations
);
authApi.post('/v1/mitra-packages/muthawifs/bulk', permit('ADMIN'), MitraPackageOptionController.bulkUpdateMuthawifs);
authApi.post(
  '/v1/mitra-packages/handling-saudis/bulk',
  permit('ADMIN'),
  MitraPackageOptionController.bulkUpdateHandlingSaudis
);
authApi.post(
  '/v1/mitra-packages/handling-domestics/bulk',
  permit('ADMIN'),
  MitraPackageOptionController.bulkUpdateHandlingDomestics
);
authApi.post('/v1/mitra-packages/siskopatuh/bulk', permit('ADMIN'), MitraPackageOptionController.bulkUpdateSiskopatuh);
authApi.post('/v1/mitra-packages/equipments/bulk', permit('ADMIN'), MitraPackageOptionController.bulkUpdateEquipments);
authApi.post('/v1/mitra-packages/tours/bulk', permit('ADMIN'), MitraPackageOptionController.bulkUpdateTourPluses);
authApi.post('/v1/mitra-packages/manasik/bulk', permit('ADMIN'), MitraPackageOptionController.bulkUpdateManasik);
authApi.get('/v1/mitra-packages/airlines', permit('ADMIN', 'MITRA'), MitraPackageOptionController.getAllAirlines);
authApi.get('/v1/mitra-packages/visas', permit('ADMIN', 'MITRA'), MitraPackageOptionController.getAllVisas);
authApi.get(
  '/v1/mitra-packages/transportations',
  permit('ADMIN', 'MITRA'),
  MitraPackageOptionController.getAllTransportations
);
authApi.get('/v1/mitra-packages/muthawifs', permit('ADMIN', 'MITRA'), MitraPackageOptionController.getAllMuthawifs);
authApi.get(
  '/v1/mitra-packages/handling-saudis',
  permit('ADMIN', 'MITRA'),
  MitraPackageOptionController.getAllHandlingSaudis
);
authApi.get(
  '/v1/mitra-packages/handling-domestics',
  permit('ADMIN', 'MITRA'),
  MitraPackageOptionController.getAllHandlingDomestics
);
authApi.get('/v1/mitra-packages/siskopatuh', permit('ADMIN', 'MITRA'), MitraPackageOptionController.getAllSiskopatuh);
authApi.get('/v1/mitra-packages/equipments', permit('ADMIN', 'MITRA'), MitraPackageOptionController.getAllEquipments);
authApi.get('/v1/mitra-packages/tours', permit('ADMIN', 'MITRA'), MitraPackageOptionController.getAllTourPluses);
authApi.get('/v1/mitra-packages/manasik', permit('ADMIN', 'MITRA'), MitraPackageOptionController.getAllManasik);

// Exchange Rate
authApi.post('/v1/exchange-rates', permit('ADMIN'), ExchangeRateController.create);
authApi.put('/v1/exchange-rates/', permit('ADMIN'), ExchangeRateController.bulkUpdate);
authApi.delete('/v1/exchange-rates/:id', permit('ADMIN'), ExchangeRateController.delete);

// Contact
authApi.post('/v1/contacts', permit('ADMIN'), ContactController.create);
authApi.put('/v1/contacts', permit('ADMIN'), ContactController.bulkUpdate);
authApi.delete('/v1/contacts/:id', permit('ADMIN'), ContactController.delete);

// Mitra Package
authApi.post('/v1/mitra-packages', permit('ADMIN', 'MITRA'), MitraPackageController.create);
authApi.get('/v1/mitra-packages/:id', permit('ADMIN', 'MITRA'), MitraPackageController.get);

// Mitra Package Order
authApi.post('/v1/mitra-package-orders', permit('ADMIN', 'MITRA'), MitraPackageOrderController.create);
authApi.get('/v1/mitra-package-orders', permit('ADMIN'), MitraPackageOrderController.getAll);
authApi.get('/v1/mitra-package-orders/user', permit('ADMIN', 'MITRA'), MitraPackageOrderController.getAllByUser);
authApi.delete('/v1/mitra-package-orders/:id', permit('ADMIN'), MitraPackageOrderController.delete);
