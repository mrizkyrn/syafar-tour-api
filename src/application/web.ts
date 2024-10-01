import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { publicRouter } from '../route/public-api';
import { authApi } from '../route/auth-api';
import { errorMiddleware } from '../middleware/error-middleware';

export const web = express();

web.use(express.json());
web.use('/public', express.static('public'));

web.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
web.use(cookieParser());

web.use(publicRouter);
web.use(authApi);

web.use(errorMiddleware);

web.get('/test', (req, res) => {
  res.send('Hello World');
});
