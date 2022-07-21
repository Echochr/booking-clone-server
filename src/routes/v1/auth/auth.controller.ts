import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import IUser from '../../../models/users/users.interface';
import { registerNewUser, loginUser } from '../../../models/users/users.model';

dotenv.config();

export async function httpRegisterNewUser(req: Request, res: Response, next: NextFunction) {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(req.body.password, salt);
  const user: IUser = {
    ...req.body,
    password: hash,
  };

  try {
    await registerNewUser(user);
    return res.status(201).json({ message: 'New user registered' });
  } catch (err: any) {
    // E11000 MongoDB Atlas error code for duplicate field
    if (/^E11000/.test(err?.message)) {
      return res.status(400).json({ message: 'Email already taken' });
    }
    return next(err);
  }
}

async function verifyPassword(plainTextPassword: string, hash: string) {
  return bcrypt.compare(plainTextPassword, hash);
}

export async function httpLoginUser(req: Request, res: Response, next: NextFunction) {
  const user: IUser = req.body;

  try {
    const foundUser = await loginUser(user);

    if (foundUser) {
      const isValidPassword = await verifyPassword(user.password, foundUser.password);
      if (isValidPassword) {
        const { _id: id, isAdmin } = foundUser;
        const token: string = jwt.sign(
          { sub: id, isAdmin },
          process.env.JWT_SECRET as string,
          { expiresIn: '1h' },
        );
        return res
          .cookie('access_token', token, {
            maxAge: 60 * 60 * 1000, // 1 hour
            httpOnly: true,
            secure: false,
          })
          .status(200).json({ id, isAdmin });
      }
    }

    return res.status(401).json({ message: 'Invalid email or password' });
  } catch (err) {
    return next(err);
  }
}

export async function httpLogoutUser(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie('access_token');
    res.status(200).json();
  } catch (err) {
    next(err);
  }
}
