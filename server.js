import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';

// routes
import jobRouter from './routers/jobRoute.js';
import authRouter from './routers/authRoute.js';
import userRouter from './routers/userRoute.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

//  middleware
import { errorMiddleWare } from './middlewares/errorMiddleWare.js';
import { authenticateUser } from './middlewares/authenticateMiddleware.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
// print log
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// init cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// use json
app.use(express.json());

// use cookieParser
app.use(cookieParser());

// use static folder
app.use(express.static(path.resolve(__dirname, './client/dist')));

// test
app.get('/', (req, res) => {
  res.send('hello, world');
});
app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test proxy' });
});

// router
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

// not found
app.use('*', (req, res) => {
  res.status(400).json({ msg: 'not found' });
});

// error handle
app.use(errorMiddleWare);

const port = process.env.PORT || 5100;

// connect mongodb
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`app is running on port ${port}`);
  });
} catch (error) {
  console.log('connect to mongodb error:', error.message);
  process.exit();
}
