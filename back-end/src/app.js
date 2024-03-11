import cookieParser from 'cookie-parser';
import express, { json, urlencoded } from 'express';
import logger from 'morgan';

import indexRouter from './routes/index.js';

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

/****************************************************
 * ROTAS DA API
 * **************************************************/

//cars
import carRoute from './routes/car.js';
app.use('/cars', carRoute);

//users
import userRoute from './routes/user.js';
app.use('/users', userRoute);

// customers
import customerRoute from './routes/customer.js';
app.use('/customers', customerRoute);

export default app;
