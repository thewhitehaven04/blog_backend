import { GenericError } from '../appError'
import { type TGenericResponse } from '../controllers/types'
import { type Response } from 'express'

const genericErrorHandler = (
  err: any,
  req: any,
  res: Response<TGenericResponse<any>>,
  next: any
): void => {
  if (err instanceof GenericError) {
    res.json({
      success: false,
      errors: err.serialize()
    })
  }
  next(err)
}

export { genericErrorHandler }
