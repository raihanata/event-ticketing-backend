import { Router } from "express";
import {deleteEvent, eventCreate, upadateEvent, viewEvent} from "../controllers/eventController.js";
import verifyToken from "../middleware/authmiddleware.js";
import upload from "../middleware/multer.js";

const eventRouter = Router()

eventRouter.get('/view',viewEvent);

eventRouter.use(verifyToken)

eventRouter.post('/create', upload.single('image'),eventCreate);

eventRouter.patch('/update', upadateEvent);
eventRouter.delete('/delete',deleteEvent);


export default eventRouter
