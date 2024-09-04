
import express from 'express';
import 'dotenv/config'
import apiRouter from './routes/index.js';
import { connect_DB } from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from "cors";


const app=express()
app.use(
    cors({
        origin: [ "http://localhost:5173"],
        credentials: true,
    })
);
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
const port=process.env.PORT
 connect_DB()

app.get('/',(req,res)=>{
    res.send('hii,how are u')
})

app.use('/api',apiRouter)

app.listen(port,()=>{
    console.log(`server is running ${port}`);
    
   
    
})

