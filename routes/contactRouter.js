import { Router } from 'express'
import { contactMessage } from '../controllers/contactController.js'


const contactRouter = Router()

contactRouter.post('/contactmessage',contactMessage)

export default contactRouter