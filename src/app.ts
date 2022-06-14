import express from 'express';

import v1Router from './routes/v1';

const app = express();

app.use(express.json());

// Routes
app.use('/api/v1', v1Router);

export default app;
