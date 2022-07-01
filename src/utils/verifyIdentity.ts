import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();

interface JTWPayload {
  sub: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

export interface IUserAuthInfoRequest extends Request {
  user?: JTWPayload
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
  if (!req?.user?.isAdmin) {
    res.status(403).json({ message: 'You are not authorized' });
  }
  next();
}
