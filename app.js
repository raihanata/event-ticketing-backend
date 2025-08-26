import express, { response } from "express"
import cors from 'cors';
import mongoose  from "mongoose";
import dotEnv from 'dotenv'
import authRouter from "./routes/authRouter.js";
import eventRouter from "./routes/eventRouter.js";
import contactRouter from "./routes/contactRouter.js";

dotEnv.config()

const app = express();
app.use(express.json());
app.use(cors("*"))


app.get('/', (req, res)=> {
    res.send('API IS RUNNING..')
})

app.use('/', authRouter)
app.use('/event', eventRouter)
app.use('/contact', contactRouter)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("database connected");
    })


app.listen(8000,()=>{
    console.log('server started at http://localhost:8000')
})