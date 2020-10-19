import * as dotenv from 'dotenv';
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? 'path.env.test' : '.env' 
});

import 'reflect-metadata';
import express from 'express';

import './database/connect';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);

export { app };