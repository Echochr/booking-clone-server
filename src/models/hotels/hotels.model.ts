import IHotel from './hotels.interface';
import Hotel from './hotels.mongo';

export async function getAllHotels(query: any): Promise<IHotel[]> {
  return Hotel.find(query);
}

export async function getHotelById(id: string): Promise<IHotel | null> {
  return Hotel.findById(id);
}

export async function getAllFeaturedHotels() {
  return Hotel.find({ featured: true }).limit(4).sort('city');
}

export async function getPropertyCountByCity(city: string) {
  return Hotel.countDocuments({ city });
}

export async function getPropertyCountByType(type: string) {
  const count = await Hotel.countDocuments({ type });
  return { type, count };
}

export async function createNewHotel(hotel: IHotel): Promise<IHotel> {
  const newHotel = new Hotel(hotel);
  await newHotel.save();
  return newHotel;
}

export async function updateHotel(id: string, hotel: IHotel): Promise<IHotel | null> {
  return Hotel.findByIdAndUpdate(id, hotel, { returnDocument: 'after' });
}

export async function deleteHotel(id: string): Promise<void | null> {
  return Hotel.findByIdAndDelete(id);
}
