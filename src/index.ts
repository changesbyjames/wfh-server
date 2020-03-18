import { config } from 'dotenv';
config();

import { setup } from 'applicationinsights';
if (process.env['NODE_ENV'] === 'production') setup().start();

import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';

const app = express();
app.use(json());
app.use(cors());

app.get('/', (req, res, next) => {})

import exampleRouter from './routers/example-router';
app.use('/api/example', exampleRouter);
 
console.log('[DEV] Express server starting...')
app.listen(process.env.PORT, () => {
  console.log(`[DEV] Express server started on port ${process.env.PORT}`)
})