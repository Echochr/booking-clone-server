import { Request, Response } from 'express';

import IHotel from '../../../models/hotels/hotels.interface';
import { getAllHotels, createNewHotel } from '../../../models/hotels/hotels.model';

export async function httpGetAllHotels(req: Request, res: Response) {
  try {
    const allHotels = await getAllHotels();
    res.status(200).json(allHotels);
  } catch (err) {
    res.status(500).json({ err });
  }
}

export async function httpCreateNewHotel(req: Request, res: Response) {
  const hotel: IHotel = req.body;
  try {
    const newHotel = await createNewHotel(hotel);
    res.status(201).json(newHotel);
  } catch (err) {
    res.status(500).json({ err });
  }
}
