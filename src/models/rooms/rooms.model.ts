import IRoom from './rooms.interface';
import Room from './rooms.mongo';
import IHotel from '../hotels/hotels.interface';
import Hotel from '../hotels/hotels.mongo';
import { getHotelById } from '../hotels/hotels.model';

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

export async function updateRoom(roomId: string, room: IRoom): Promise<IRoom | null> {
  return Room.findByIdAndUpdate(roomId, room, { returnDocument: 'after' });
}

export async function deleteRoom(hotelId: string, roomId: string): Promise<IHotel | null> {
  const foundHotel = await getHotelById(hotelId);
  const foundRoom = await getRoomById(roomId);
  if (!foundHotel || !foundRoom) {
    return null;
  }
  await Room.findByIdAndDelete(roomId);
  return Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } });
}
