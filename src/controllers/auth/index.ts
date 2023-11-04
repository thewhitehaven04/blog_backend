import expressAsyncHandler from 'express-async-handler'
import { type Request } from 'express'
import { type IAuthRequestDto } from './types'
import { auth } from '../../services/auth'

const getToken = expressAsyncHandler(
  (req: Request<any, any, IAuthRequestDto, any>, res) => {
    const token = await auth(req.body)
    return res.json({
      token
    })
  }
)

export { getToken }
