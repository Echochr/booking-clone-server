import { Request, Response, NextFunction } from 'express';

import IRoom from '../../../models/rooms/rooms.interface';
import { getRoomById, createNewRoom } from '../../../models/rooms/rooms.model';

export async function httpGetRoomById(req: Request, res: Response, next: NextFunction) {
  const { roomId } = req.params;
  try {
    const room = await getRoomById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room ID not found' });
    }
    return res.status(200).json(room);
  } catch (err) {
    return next(err);
  }
}

export async function httpCreateNewRoom(req: Request, res: Response, next: NextFunction) {
  const { hotelId } = req.params;
  const room: IRoom = req.body;
  try {
    const newRoom = await createNewRoom(room, hotelId);
    return res.status(201).json(newRoom);
  } catch (err) {
    return next(err);
  }
}
