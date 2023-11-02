import { type Response, type Request } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { type ICreatePostRequestDto } from './types'
import { type IGenericResponse } from '../types'
import { GenericError } from '../../appError'

const createPost = expressAsyncHandler(
  (
    req: Request<any, any, ICreatePostRequestDto, any>,
    res: Response<IGenericResponse>
  ) => {
    res.json({
      success: true,
      errors: []
    })
  }
)

const error = expressAsyncHandler((req, res: Response<IGenericResponse>) => {
  throw new GenericError('test')
})

export { createPost, error }
