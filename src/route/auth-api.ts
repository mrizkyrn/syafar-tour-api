import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware';
import { permit } from '../middleware/permit-middleware';
import { AuthController } from '../controller/auth-controller';
import { UserServiceController } from '../controller/user-service-controller';
import { CategoryController } from '../controller/category-controller';
import { ProductController } from '../controller/product-controller';
import { OrderController } from '../controller/order-controller';
import { upload } from '../middleware/multer-middleware';


export const authApi = express.Router();

authApi.use(authMiddleware);

authApi.get('/v1/auth/me', AuthController.me);
authApi.post('/v1/auth/logout', AuthController.logout);

authApi.post('/v1/user-service/bulk', permit('ADMIN'), UserServiceController.bulkUpdate);
authApi.get('/v1/user-service/:type', UserServiceController.getByType);

authApi.post('/v1/category', permit('ADMIN'), CategoryController.create);

authApi.put('/v1/category/:id', permit('ADMIN'), CategoryController.update);
authApi.delete('/v1/category/:id', permit('ADMIN'), CategoryController.delete);

authApi.post('/v1/product', permit('ADMIN'), upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 5 }]), ProductController.create);
authApi.patch('/v1/product/:id', permit('ADMIN'), upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 5 }]), ProductController.update);
authApi.delete('/v1/product/:id', permit('ADMIN'), ProductController.delete);

authApi.get('/v1/order', permit('ADMIN'), OrderController.getAll);
authApi.get('/v1/order/:id', OrderController.get);
authApi.post('/v1/order', OrderController.create);