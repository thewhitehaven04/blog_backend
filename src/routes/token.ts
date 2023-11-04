import { Router } from 'express'
import { getToken, postRegister } from '../controllers/auth'

const tokenRouter = Router()

tokenRouter.post('/authenticate', getToken)
tokenRouter.post('/register', postRegister)

export default tokenRouter
