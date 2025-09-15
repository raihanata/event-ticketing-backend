import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import upload from "../middleware/multer.js";
import { fileUploads } from "../controllers/mutercontroller.js";

const testRouter = Router()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

testRouter.post('/profile-upload-single', upload.single('profile-file'),fileUploads)


export default testRouter