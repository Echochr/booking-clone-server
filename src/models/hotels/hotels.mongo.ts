import mongoose from 'mongoose';

import IHotel from './hotels.interface';

// Workaround: disable mongoose SchemaType casting
mongoose.Schema.Types.String.cast(false);
mongoose.Schema.Types.Number.cast(false);
mongoose.Schema.Types.Boolean.cast(false);

const HotelSchema = new mongoose.Schema<IHotel>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
  },
  photos: {
    type: [String],
  },
  rooms: {
    type: [String],
    required: true,
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<IHotel>('Hotel', HotelSchema);
