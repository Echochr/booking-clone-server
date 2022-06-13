import dotenv from 'dotenv';
import http from 'http';

import app from './app';
import { connectDB } from './mongodb';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 4000;
const httpServer = http.createServer(app);

async function startHTTPServer() {
  await connectDB();
  httpServer.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
}

startHTTPServer();
