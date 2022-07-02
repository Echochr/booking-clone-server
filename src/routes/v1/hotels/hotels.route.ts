import express from 'express';

import {
  httpGetAllHotels,
  httpGetHotelById,
  httpCreateNewHotel,
  httpUpdateHotel,
  httpDeleteHotel,
  httpGetPropertyCountByCity,
} from './hotels.controller';

const hotelsRouter = express.Router();

// GET
hotelsRouter.get('/', httpGetAllHotels);
hotelsRouter.get('/find/:id', httpGetHotelById);
hotelsRouter.get('/countByCity', httpGetPropertyCountByCity);
// POST
hotelsRouter.post('/', httpCreateNewHotel);
// PUT
hotelsRouter.put('/:id', httpUpdateHotel);
// DELETE
hotelsRouter.delete('/:id', httpDeleteHotel);

export default hotelsRouter;
