import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const { MONGO_ATLAS_URL } = process.env;

mongoose.connection.once('open', () => {
  console.log('MongoDB Atlas connection opened');
});

mongoose.connection.on('error', () => {
  console.error('MongoDB Atlas connection error');
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB Atlas connection disconnected');
});

export async function connectDB() {
  await mongoose.connect(MONGO_ATLAS_URL as string);
}

export async function disconnectDB() {
  await mongoose.disconnect();
}
