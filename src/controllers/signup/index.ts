import expressAsyncHandler from 'express-async-handler'
import { type Request, type Response } from 'express'
import { type ISignUpRequestDto } from './types'
import * as SignupService from './../../services/signup'
import { type TGenericResponse } from '../types/response'

const postSignUp = expressAsyncHandler(
  async (
    req: Request<any, any, ISignUpRequestDto>,
    res: Response<TGenericResponse>
  ) => {
    await SignupService.signUp(req.body)
    res.send({
      success: true,
      data: null
    })
  }
)

export { postSignUp }
