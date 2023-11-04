import expressAsyncHandler from 'express-async-handler'
import { type Request } from 'express'
import { type IAuthRequestDto } from './types'
import { auth } from '../../services/auth'

const getToken = expressAsyncHandler(
  async (req: Request<any, any, IAuthRequestDto, any>, res) => {
    await auth(req.body, (token) => {
      res.status(200).json({ token })
    })
  }
)

export { getToken }
