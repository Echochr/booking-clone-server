import { Request, Response } from 'express';

import IHotel from '../../../models/hotels/hotels.interface';
import { getAllHotels, createNewHotel, updateHotel } from '../../../models/hotels/hotels.model';

export async function httpGetAllHotels(req: Request, res: Response) {
  try {
    const allHotels: IHotel[] = await getAllHotels();
    return res.status(200).json(allHotels);
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
