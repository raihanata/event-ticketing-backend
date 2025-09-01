import { Router } from "express";
import { cartAdd } from "../controllers/cartController";


const cartRouter = Router()
cartRouter.post("/cartadd",cartAdd)

export default cartRouter