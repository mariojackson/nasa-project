import http from 'http';
import mongoose from 'mongoose';

import app from './app.js';
import { loadPlanetsData } from './models/planets.model.js';

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb://127.0.0.1:27017/nasa?retryWrites=true';

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('Connected successfully to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.error(error);
});

await mongoose.connect(MONGO_URL);
await loadPlanetsData();

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
