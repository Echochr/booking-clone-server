import express from 'express';

import { httpRegisterNewUser, httpLoginUser, httpLogoutUser } from './auth.controller';

const authRouter = express.Router();

// POST
authRouter.post('/register', httpRegisterNewUser);
authRouter.post('/login', httpLoginUser);

// GET
authRouter.get('/logout', httpLogoutUser);

export default authRouter;
