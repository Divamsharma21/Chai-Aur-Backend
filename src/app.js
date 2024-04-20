import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"20kb"})) // from taken data from json or array
app.use(express.urlencoded({extended:true,limit:"20kb"})) // for taken data from url
app.use(express.static("public"))  // when we want to store the asserts or pdf or images i use this 
app.use(cookieParser()) // we use this for easily cookie parser for user data restore 

// router import 

import userRouter from './routes/user.routes.js'

// router declareation
app.use("/api/v2/user/register",userRouter)


export  {app}