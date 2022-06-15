import { Request, Response } from 'express';

import IHotel from '../../../models/hotels/hotels.interface';
import {
  getAllHotels,
  getHotelById,
  createNewHotel,
  updateHotel,
  deleteHotel,
} from '../../../models/hotels/hotels.model';

export async function httpGetAllHotels(req: Request, res: Response) {
  try {
    const allHotels = await getAllHotels();
    return res.status(200).json(allHotels);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

export async function httpGetHotelById(req: Request, res: Response) {
  const hotelID = req.params.id;
  try {
    const hotel = await getHotelById(hotelID);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel ID not found' });
    }
    return res.status(200).json(hotel);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

export async function httpCreateNewHotel(req: Request, res: Response) {
  const hotel: IHotel = req.body;
  try {
    const newHotel = await createNewHotel(hotel);
    return res.status(201).json(newHotel);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

export async function httpUpdateHotel(req: Request, res: Response) {
  const hotelID = req.params.id;
  const hotel: IHotel = req.body;
  try {
    const updatedHotel = await updateHotel(hotelID, hotel);
    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel ID not found' });
    }
    return res.status(200).json(updatedHotel);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

export async function httpDeleteHotel(req: Request, res: Response) {
  const hotelID = req.params.id;
  try {
    const hotel = await deleteHotel(hotelID);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel ID not found' });
    }
    return res.status(204).json();
  } catch (err) {
    return res.status(500).json({ err });
  }
}
