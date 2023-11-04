import { Router } from 'express'
import { getToken } from '../controllers/auth'

const tokenRouter = Router()

tokenRouter.post('/authenticate', getToken)

export default tokenRouter
