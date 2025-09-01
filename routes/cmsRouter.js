import { Router } from "express";
import { getSpeakers } from "../controllers/cmsController.js";

const cmsRouter = Router()

cmsRouter.get('/speakers', getSpeakers)

export default cmsRouter