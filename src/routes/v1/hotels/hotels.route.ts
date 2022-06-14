import express from 'express';

import { httpGetAllHotels, httpCreateNewHotel } from './hotels.controller';

const hotelsRouter = express.Router();

// GET
hotelsRouter.get('/', httpGetAllHotels);
// POST
hotelsRouter.post('/', httpCreateNewHotel);

export default hotelsRouter;
