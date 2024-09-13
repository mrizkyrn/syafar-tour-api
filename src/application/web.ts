import express from 'express';
// import { publicRouter } from '../route/public-api';
// import { errorMiddleware } from '../middleware/error-middleware';
// import cookieParser from 'cookie-parser';
import cors from 'cors';
// import { authApi } from '../route/auth-api';

export const web = express();
web.use(express.json());
web.use(express.static('public'));
web.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// web.use(cookieParser());

// web.use(publicRouter);
// web.use(authApi);

// web.use(errorMiddleware);

web.get('/test', (req, res) => {
    res.send('Hello World');
});