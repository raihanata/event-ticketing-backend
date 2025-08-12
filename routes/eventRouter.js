import { Router } from "express";
import {deleteEvent, eventCreate, upadateEvent, viewEvent} from "../controllers/eventController.js";

const eventRouter = Router()
eventRouter.post('/create',eventCreate);
eventRouter.get('/view',viewEvent);
eventRouter.patch('/update',upadateEvent);
eventRouter.delete('/delete',deleteEvent);


export default eventRouter
