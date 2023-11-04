import { GenericError } from '../appError'
import { type IGenericResponse } from '../controllers/types'
import { type Response } from 'express'

const genericErrorHandler = (
  err: any,
  req: any,
  res: Response<IGenericResponse<any>>,
  next: any
): void => {
  if (err instanceof GenericError) {
    res.json({
      success: false,
      errors: [err.serialize()],
      data: []
    })
  }
  next(err)
}

export { genericErrorHandler }
