import { Router } from 'express'
import  { login, registration } from '../controllers/authController.js'



const authRouter = Router()

authRouter.post('/register',registration)
authRouter.post('/login',login)
//Routes here

export default authRouter