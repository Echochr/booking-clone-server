import express from 'express';

import { httpGetAllHotels, httpCreateNewHotel, httpUpdateHotel } from './hotels.controller';

const hotelsRouter = express.Router();

// GET
hotelsRouter.get('/', httpGetAllHotels);
// POST
hotelsRouter.post('/', httpCreateNewHotel);
// PUT
hotelsRouter.put('/:id', httpUpdateHotel);

export default hotelsRouter;
