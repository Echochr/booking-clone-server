import IHotel from './hotels.interface';
import Hotel from './hotels.mongo';

export async function getAllHotels(): Promise<IHotel[]> {
  return Hotel.find();
}

export async function createNewHotel(hotel: IHotel): Promise<IHotel> {
  const newHotel = new Hotel(hotel);
  await newHotel.save();
  return newHotel;
}

export async function updateHotel(id: string, hotel: IHotel): Promise<IHotel | null> {
  return Hotel.findByIdAndUpdate(id, hotel, { returnDocument: 'after' });
}
