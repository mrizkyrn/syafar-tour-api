import { Response, NextFunction } from 'express';
import { ResponseError } from '../error/response-error';
import { UserRequest } from '../type/user-request';

export const permit = (...roles: string[]) => {
   return (req: UserRequest, res: Response, next: NextFunction) => {
      const user = req.user;

      if (!user) {
         return next(new ResponseError(401, 'Unauthorized'));
      }

      if (!roles.includes(user.role)) {
         return next(new ResponseError(403, 'Forbidden'));
      }

      next();
   };
}