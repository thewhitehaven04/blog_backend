import { type NextFunction, type Request, type Response } from 'express'
import { validationResult, type Schema, checkSchema } from 'express-validator'
import { type TGenericResponse } from '../controllers/types'

export function validateRequestBody<T>(requestBodySchema: Schema) {
  return (
    req: Request,
    res: Response<TGenericResponse<T>>,
    next: NextFunction
  ) => {
    checkSchema(requestBodySchema)
    const errors = validationResult(req.body)

    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array()
      })
      return 
    }

    next()
  }
}
