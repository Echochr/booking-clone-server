import mongoose from 'mongoose';

export interface IHotel {
  name: string;
  description: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  rating?: number;
  photos?: string[];
  rooms?: string[];
  cheapestPrice: number;
  featured?: boolean;
}

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
    max: 5,
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
