import mongoose from 'mongoose';

import IRoom from './rooms.interface';

// Workaround: disable mongoose SchemaType casting
mongoose.Schema.Types.String.cast(false);
mongoose.Schema.Types.Number.cast(false);
mongoose.Schema.Types.Boolean.cast(false);

const RoomSchema = new mongoose.Schema<IRoom>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxGuest: {
    type: Number,
    required: true,
  },
  roomNumbers: [{
    number: Number,
    unavailableDates: [Date],
  }],
});

export default mongoose.model<IRoom>('Room', RoomSchema);
