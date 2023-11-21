import { Request, Response, NextFunction } from 'express';
import { validateToken } from './token';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const decoded = validateToken(authorization);
  if (!decoded) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  res.locals.user = decoded;
  return next();
};
