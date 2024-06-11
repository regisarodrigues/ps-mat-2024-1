import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

<<<<<<< HEAD
import dotenv from 'dotenv'
// Carrega as variáveis de ambiente do arquivo .env
dotenv.config()

import indexRouter from "./routes/index.js";
//import usersRouter from "./routes/users.js";

const app = express();

import cors from 'cors'

app.use(cors({
  origin: process.env.FRONT_END_URL.split(','),
  credentials: true
}))

=======
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

const app = express();

>>>>>>> 2d1edc18bce51b59a278b1657867cf27e0aa237b
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
<<<<<<< HEAD
//app.use("/users", usersRouter);
=======
app.use("/users", usersRouter);
>>>>>>> 2d1edc18bce51b59a278b1657867cf27e0aa237b

/************************************************
 * ROTAS DA API
************************************************/

<<<<<<< HEAD
// Middleware que protege as rotas com autenticação
import auth from './middleware/auth.js'
app.use(auth)

import carRoute from './routes/car.js'
app.use('/cars', carRoute)

import userRoute from './routes/user.js'
app.use('/users', userRoute)

import customerRoute from './routes/customer.js'
app.use('/customers', customerRoute)
=======
import carRouter from './routes/car.js'
app.use('/cars', carRouter)
>>>>>>> 2d1edc18bce51b59a278b1657867cf27e0aa237b

export default app;
