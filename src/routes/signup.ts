import { Router } from 'express'
import * as SignupController from './../controllers/signup'
const signupRouter = Router()

signupRouter.post('/', SignupController.postSignUp)

export default signupRouter
