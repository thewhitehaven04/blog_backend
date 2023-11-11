import {
  type RequestHandler,
  type NextFunction,
  type Request,
  type Response
} from 'express'
import { type TGenericResponse } from '../controllers/types'
import expressAsyncHandler from 'express-async-handler'
import { type ContextRunner } from 'express-validator/src/chain'

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
            errors: result.array()
          })
          return
        }
      }

      next()
    }
  )
}
