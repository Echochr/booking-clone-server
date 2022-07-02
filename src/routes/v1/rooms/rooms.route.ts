import express from 'express';

import { httpGetRoomById, httpCreateNewRoom, httpDeleteRoom } from './rooms.controller';

const roomsRouter = express.Router();

// GET
roomsRouter.get('/:roomId', httpGetRoomById);
// POST
roomsRouter.post('/:hotelId', httpCreateNewRoom);
// DELETE
roomsRouter.delete('/:hotelId/:roomId', httpDeleteRoom);

export default roomsRouter;
