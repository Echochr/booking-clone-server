import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import v1Router from './routes/v1';

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(express.json());

// Routes
app.use('/api/v1', v1Router);

export default app;
