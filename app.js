import express, { response } from "express"
import cors from 'cors';
import mongoose  from "mongoose";
import dotEnv from 'dotenv'
import authRouter from "./routes/authRouter.js";
import eventRouter from "./routes/eventRouter.js";
import contactRouter from "./routes/contactRouter.js";
import cmsRouter from "./routes/cmsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import path from "path";
import { fileURLToPath } from "url";
import testRouter from "./routes/testRouter.js";
import multer from "multer";
dotEnv.config()

const app = express();
app.use(express.json());
app.use(cors("*"))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res)=> {
    res.send('API IS RUNNING..')
})

app.use('/', authRouter)
app.use('/event', eventRouter)
app.use('/contact', contactRouter)
app.use('/cart', cartRouter)
app.use('/cms', cmsRouter)
app.use('/fileupload',testRouter)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("database connected");
    })


app.listen(8000,()=>{
    console.log('server started at http://localhost:8000')
})