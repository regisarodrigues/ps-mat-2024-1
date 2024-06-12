import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from 'dotenv';
import cors from 'cors';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config()

import indexRouter from "./routes/index.js";
//import usersRouter from "./routes/users.js";

const app = express();


app.use(cors({
  origin: process.env.FRONT_END_URL.split(','),
  credentials: true
}));

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
//app.use("/users", usersRouter);

/************************************************
 * ROTAS DA API
************************************************/

// Middleware que protege as rotas com autenticação
import auth from './middleware/auth.js'
app.use(auth)

import carRoute from './routes/car.js'
app.use('/cars', carRoute)

import userRoute from './routes/user.js'
app.use('/users', userRoute)

import customerRoute from './routes/customer.js'
app.use('/customers', customerRoute)

// Importa e usa o roteador 'sobre'
import aboutRoute from './routes/sobre.js'
app.use('/about', aboutRoute)

export default app;