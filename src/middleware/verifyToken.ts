import { type NextFunction, type Request, type Response } from 'express'
import { type IncomingHttpHeaders } from 'http'
import { GenericError } from '../appError'
import { type VerifyErrors, verify } from 'jsonwebtoken'
import { type IGenericResponse } from '../controllers/types'

function parseAuthHeaderForBearerToken(headers: IncomingHttpHeaders): string {
  const regexp = /Bearer: (.+)/
  const match = headers.authorization?.match(regexp)?.[0]
  if (match != null) return match

  throw new GenericError('Authorization header is in invalid format')
}

export function verifyToken(
  req: Request,
  res: Response<IGenericResponse<null>>,
  next: NextFunction
): void {
  const token = parseAuthHeaderForBearerToken(req.headers)

  verify(token, process.env.AUTH_SECRET ?? '', (error: VerifyErrors | null) => {
    if (error != null) {
      res.status(401).json({
        success: false,
        errors: [],
        data: null
      })
    } else {
      next()
    }
  })
}
