import mongoose from 'mongoose';

import IUser from './users.interface';

// Workaround: disable mongoose SchemaType casting
mongoose.Schema.Types.String.cast(false);
mongoose.Schema.Types.Boolean.cast(false);

const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IUser>('User', UserSchema);
