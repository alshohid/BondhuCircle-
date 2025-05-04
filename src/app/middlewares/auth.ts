import { Request, Response, NextFunction } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized. No token provided.");
      }

      const token = authHeader.split(" ")[1];

      const verifiedUser = jwt.verify(token, config.jwt.secret as Secret) as JwtPayload;

      (req as any).user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden. You are not authorized to access this route.");
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
