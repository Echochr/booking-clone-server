import express from 'express';

import authRouter from './auth';
import hotelsRouter from './hotels';
import roomsRouter from './rooms';
import usersRouter from './users';

const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/hotels', hotelsRouter);
v1Router.use('/rooms', roomsRouter);
v1Router.use('/users', usersRouter);

export default v1Router;
