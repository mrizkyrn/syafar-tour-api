import jwt from 'jsonwebtoken';

import { Response, NextFunction } from 'express';
import { UserRequest } from '../type/user-request';

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
   const token = req.cookies.access_token;


   if (!token) {
      return res.status(401).json({
         success: false,
         message: 'Unauthorized',
      });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded;
      next();
   } catch (error) {
      return res.status(401).json({
         success: false,
         message: 'Unauthorized',
      });
   }
};
