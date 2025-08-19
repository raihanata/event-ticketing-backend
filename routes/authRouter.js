import { Router } from 'express'
import  { forgotpwdcheck, login, registration } from '../controllers/authController.js'



const authRouter = Router()
//Routes here
authRouter.post('/register',registration)
authRouter.post('/login',login)
authRouter.post('/checkuser',forgotpwdcheck)


export default authRouter