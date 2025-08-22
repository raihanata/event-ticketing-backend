import { Router } from 'express'
import  { forgotpwdcheck, login, registration, resetPassword, verifyOtp } from '../controllers/authController.js'



const authRouter = Router()
//Routes here
authRouter.post('/register',registration)
authRouter.post('/login',login)
authRouter.post('/checkuser',forgotpwdcheck)
authRouter.post('/verifyotp',verifyOtp)
authRouter.post('/resetpassword',resetPassword)
export default authRouter