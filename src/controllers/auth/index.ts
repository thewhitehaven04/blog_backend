import expressAsyncHandler from 'express-async-handler'
import { type Response, type Request } from 'express'
import { type TAuthResponseDto, type IAuthRequestDto } from './types'
import { auth } from '../../services/auth'

const getToken = expressAsyncHandler(
  async (
    req: Request<any, any, IAuthRequestDto, any>,
    res: Response<TAuthResponseDto>
  ) => {
    await auth(req.body, (token) => {
      res.status(200).json({ success: true, data: { token } })
    })
  }
)

export { getToken }
