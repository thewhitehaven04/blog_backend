import {
  type RequestHandler,
  type NextFunction,
  type Request,
  type Response
} from 'express'
import { type TGenericResponse } from '../controllers/types/response'
import expressAsyncHandler from 'express-async-handler'
import { type ContextRunner } from 'express-validator/src/chain'
import { type ISerializedValidationError } from '../typings/error'
import { type ValidationError, type ErrorFormatter } from 'express-validator'

const fieldValidationErrorFormatter: ErrorFormatter<
  ISerializedValidationError
> = (err: ValidationError) => {
  return { message: err.msg }
}

export function validateRequest<T>(
  validators: ContextRunner[]
): RequestHandler {
  return expressAsyncHandler(
    async (
      req: Request,
      res: Response<TGenericResponse<T>>,
      next: NextFunction
    ) => {
      for (const validator of validators) {
        const result = await validator.run(req)

        if (result.context.errors.length > 0) {
          res.status(400).json({
            success: false,
            errors: result.formatWith(fieldValidationErrorFormatter).array()
          })
          return
        }
      }

      next()
    }
  )
}
