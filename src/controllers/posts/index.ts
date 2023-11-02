import { type Response, type Request } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { type ICreatePostRequestDto } from './types'
import { type IGenericResponse } from '../types'

const createPost = expressAsyncHandler(
  (
    req: Request<any, any, ICreatePostRequestDto, any>,
    res: Response<IGenericResponse>
  ) => {
    res.send({
      success: true,
      errors: []
    })
  }
)

export { createPost }
