import expressAsyncHandler from 'express-async-handler'
import { type Response, type Request } from 'express'
import { type TAuthResponseDto, type IAuthRequestDto, type IRefreshTokenRequestDto } from './types'
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

const getRefreshToken = expressAsyncHandler(
  async (
    req: Request<any, any, IRefreshTokenRequestDto>,
    res: Response<TAuthResponseDto> 
  ) => {

  }
)

export { getToken }
