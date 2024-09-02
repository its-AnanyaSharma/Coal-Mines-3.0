import express from 'express'
import {registerContoller, loginController, testController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

//router object
const router= express.Router()

//routing
//REGISTER || MEHTOD POST
router.post('/register', registerContoller)

//LOGIN || POST
router.post('/login',loginController)

//test routes
router.get('/test',requireSignIn, isAdmin, testController)

export default router