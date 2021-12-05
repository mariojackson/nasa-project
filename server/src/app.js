import path from 'path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import planetsRouter from './routes/planets/planets.router.js';
import launchesRouter from './routes/launches/launches.router.js';

// ES Module __dirname hack, since ES modules don't have the __dirname property.
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

// Logger
app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

// Serve index.html file as default.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

export default app;
