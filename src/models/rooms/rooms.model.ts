import IRoom from './rooms.interface';
import Room from './rooms.mongo';
import Hotel from '../hotels/hotels.mongo';

export async function getRoomById(roomId: string): Promise<IRoom | null> {
  const foundRoom = await Room.findById(roomId);
  return foundRoom;
}

export async function createNewRoom(room: IRoom, hotelId: string): Promise<IRoom> {
  const newRoom = new Room(room);
  const savedRoom = await newRoom.save();
  // eslint-disable-next-line no-underscore-dangle
  await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id.toJSON() } });
  return savedRoom;
}
