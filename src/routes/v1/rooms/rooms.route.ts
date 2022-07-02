import express from 'express';

import {
  httpGetRoomById,
  httpCreateNewRoom,
  httpUpdateRoom,
  httpDeleteRoom,
} from './rooms.controller';

const roomsRouter = express.Router();

// GET
roomsRouter.get('/:roomId', httpGetRoomById);
// POST
roomsRouter.post('/:hotelId', httpCreateNewRoom);
// PUT
roomsRouter.put('/:roomId', httpUpdateRoom);
// DELETE
roomsRouter.delete('/:hotelId/:roomId', httpDeleteRoom);

export default roomsRouter;
