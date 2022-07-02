import express from 'express';

import {
  httpGetAllHotels,
  httpGetHotelById,
  httpCreateNewHotel,
  httpUpdateHotel,
  httpDeleteHotel,
  httpGetPropertyCountByCity,
  httpGetPropertyCountByType,
} from './hotels.controller';

const hotelsRouter = express.Router();

// GET
hotelsRouter.get('/', httpGetAllHotels);
hotelsRouter.get('/find/:id', httpGetHotelById);
hotelsRouter.get('/countByCity', httpGetPropertyCountByCity);
hotelsRouter.get('/countByType', httpGetPropertyCountByType);
// POST
hotelsRouter.post('/', httpCreateNewHotel);
// PUT
hotelsRouter.put('/:id', httpUpdateHotel);
// DELETE
hotelsRouter.delete('/:id', httpDeleteHotel);

export default hotelsRouter;
