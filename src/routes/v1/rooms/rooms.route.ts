import express from 'express';

import { httpGetRoomById, httpCreateNewRoom } from './rooms.controller';

const roomsRouter = express.Router();

// GET
roomsRouter.get('/:roomId', httpGetRoomById);
// POST
roomsRouter.post('/:hotelId', httpCreateNewRoom);

export default roomsRouter;
