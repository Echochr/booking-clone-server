import { Request, Response, NextFunction } from 'express';

import IHotel from '../../../models/hotels/hotels.interface';
import {
  getAllHotels,
  getHotelById,
  createNewHotel,
  updateHotel,
  deleteHotel,
  getPropertyCountByCity,
  getPropertyCountByType,
} from '../../../models/hotels/hotels.model';

export async function httpGetAllHotels(_req: Request, res: Response, next: NextFunction) {
  try {
    const allHotels = await getAllHotels();
    return res.status(200).json(allHotels);
  } catch (err) {
    return next(err);
  }
}

export async function httpGetHotelById(req: Request, res: Response, next: NextFunction) {
  const hotelID = req.params.id;
  try {
    const hotel = await getHotelById(hotelID);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel ID not found' });
    }
    return res.status(200).json(hotel);
  } catch (err) {
    return next(err);
  }
}

export async function httpCreateNewHotel(req: Request, res: Response, next: NextFunction) {
  const hotel: IHotel = req.body;
  try {
    const newHotel = await createNewHotel(hotel);
    return res.status(201).json(newHotel);
  } catch (err) {
    return next(err);
  }
}

export async function httpUpdateHotel(req: Request, res: Response, next: NextFunction) {
  const hotelID = req.params.id;
  const hotel: IHotel = req.body;
  try {
    const updatedHotel = await updateHotel(hotelID, hotel);
    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel ID not found' });
    }
    return res.status(200).json(updatedHotel);
  } catch (err) {
    return next(err);
  }
}

export async function httpDeleteHotel(req: Request, res: Response, next: NextFunction) {
  const hotelID = req.params.id;
  try {
    const hotel = await deleteHotel(hotelID);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel ID not found' });
    }
    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
}

export async function httpGetPropertyCountByCity(req: Request, res: Response, next: NextFunction) {
  const { cities } = req.query;
  try {
    if (!cities) {
      return res.status(400).json({ message: 'No cities provided' });
    }
    const citiesList = (cities as string).split(',');
    const propCountByCity = await Promise.all(
      citiesList.map((city) => getPropertyCountByCity(city)),
    );
    return res.status(200).json(propCountByCity);
  } catch (err) {
    return next(err);
  }
}

export async function httpGetPropertyCountByType(req: Request, res: Response, next: NextFunction) {
  const { types } = req.query;
  try {
    if (!types) {
      return res.status(400).json({ message: 'No types provided' });
    }
    const typesList = (types as string).split(',');
    const propCountByType = await Promise.all(
      typesList.map((type) => getPropertyCountByType(type)),
    );
    return res.status(200).json(propCountByType);
  } catch (err) {
    return next(err);
  }
}
