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
import { verifyToken, verifyAdmin } from '../../../utils/verifyIdentity';

const hotelsRouter = express.Router();

// GET
hotelsRouter.get('/', httpGetAllHotels);
hotelsRouter.get('/find/:id', httpGetHotelById);
hotelsRouter.get('/countByCity', httpGetPropertyCountByCity);
hotelsRouter.get('/countByType', httpGetPropertyCountByType);
// POST
hotelsRouter.post('/', verifyToken, verifyAdmin, httpCreateNewHotel);
// PUT
hotelsRouter.put('/:id', verifyToken, verifyAdmin, httpUpdateHotel);
// DELETE
hotelsRouter.delete('/:id', verifyToken, verifyAdmin, httpDeleteHotel);

export default hotelsRouter;
