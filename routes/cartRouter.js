import { Router } from "express";
import { AddeventItems,cartView, deleteByTicketType, deleteEvent, upadateCart } from "../controllers/cartController.js";
import verifyToken from "../middleware/authmiddleware.js";


const cartRouter = Router()

cartRouter.use(verifyToken)

cartRouter.post("/additems",AddeventItems)
cartRouter.get("/view", cartView)
cartRouter.delete("/event",deleteEvent )
cartRouter.delete("/ticketType",deleteByTicketType )
cartRouter.patch("/update", upadateCart)

export default cartRouter