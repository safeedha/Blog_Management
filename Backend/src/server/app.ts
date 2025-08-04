import express,{Application} from 'express'
import morgan from 'morgan'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import {userRouter} from '../interfaces/routes/userRoutes'
import { refreshTokenRouter } from '../interfaces/routes/refreshTokenRouter'

export class App{
  public app:Application
  constructor(){
    this.app=express()
    this.app.use(morgan('dev'))
      this.app.use(cors({
      origin: ['http://localhost:5173','https://medimate-rust.vercel.app','https://www.medi-mate.safeedha.site'],
      credentials: true
    }));
    this.app.use(express.json());
    this.app.use(cookieParser());
      dotenv.config();
    this.app.use('/user',userRouter)
    this.app.use('/refresh-token',refreshTokenRouter)
  }
}



