import IHotel from './hotels.interface';
import Hotel from './hotels.mongo';

export async function getAllHotels(query: any): Promise<IHotel[]> {
  const {
    featured, min, max, limit, sort, ...rest
  } = query;
  const castedQuery = { ...rest };

  if (featured) Object.assign(castedQuery, { featured: featured === 'true' });
  if (min) Object.assign(castedQuery, { cheapestPrice: { $gte: Number(min) || 1 } });
  if (max) Object.assign(castedQuery, { cheapestPrice: { $lte: Number(max) || 999 } });

  return Hotel.find(castedQuery).limit(Number(limit)).sort(sort);
}

export async function getHotelById(id: string): Promise<IHotel | null> {
  return Hotel.findById(id);
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
