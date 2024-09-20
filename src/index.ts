import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import morgan from 'morgan'
dotenv.config()
import { PORT } from "./constants/env";
import userRoutes from "./gateway/routes";
import { CLIENT_URL } from "./constants/env";
import handleError from "./application/err.handler";

const app = express();

app.use(
    cors({
        origin: CLIENT_URL,
        credentials:true
    })
)
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'))

app.get('/pdfManagerServer',(req,res)=>res.send('You are all set'))

app.use('/pdfManagerServer/user',userRoutes)

app.use(handleError)

app.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`)
})