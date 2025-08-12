import express, { response } from "express"
import cors from 'cors';
import mongoose  from "mongoose";
import dotEnv from 'dotenv'
import authRouter from "./routes/authRouter.js";
import eventRouter from "./routes/eventRouter.js";

dotEnv.config()

const app = express();
app.use(express.json());
app.use(cors("*"))



app.use('/', authRouter)
app.use('/event', eventRouter)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("database connected");
    })


app.listen(8000,()=>{
    console.log('server started at http://localhost:8000')
})