import expressAsyncHandler from 'express-async-handler'
import { type Request, type Response } from 'express'
import { type ISignUpRequestDto } from './types'
import * as SignupService from './../../services/signup'
import { type TGenericResponse<T> } from '../types'

const postSignUp = expressAsyncHandler(
  async (
    req: Request<any, any, ISignUpRequestDto>,
    res: Response<TGenericResponse<T><null>>
  ) => {
    await SignupService.signUp(req.body)
    res.send({
      success: true,
      errors: [],
    })
  }
)

export { postSignUp }
