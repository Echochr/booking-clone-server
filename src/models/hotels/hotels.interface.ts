export default interface IHotel {
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
