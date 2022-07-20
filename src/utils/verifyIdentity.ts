import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();

interface JWTPayload {
  sub: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

export interface IUserAuthInfoRequest extends Request {
  user?: JWTPayload
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.access_token;
  if (!token) {
    res.status(401).json({ message: 'You must be logged in' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) {
      res.status(403).json({ message: 'Invalid access token' });
    }
    Object.assign(req, { user });
    next();
  });
}

export function verifyAdmin(req: IUserAuthInfoRequest, res: Response, next: NextFunction) {
  const token = req.cookies.access_token;
  jwt.verify(token, process.env.JWT_SECRET as string, (_err: any, { isAdmin }: any) => {
    if (isAdmin) return next();
    return res.status(403).json({ message: 'You are not authorized' });
  });
}
