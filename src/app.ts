import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import v1Router from './routes/v1';

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'https://booking-clone-client.netlify.app'],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/v1', v1Router);

export default app;
