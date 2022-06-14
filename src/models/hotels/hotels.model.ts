import Hotel, { IHotel } from './hotels.mongo';

export async function getAllHotels(): Promise<IHotel[]> {
  return Hotel.find();
}

export async function createNewHotel(hotel: IHotel): Promise<IHotel> {
  const newHotel = new Hotel(hotel);
  await newHotel.save();
  return newHotel;
}
