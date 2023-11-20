import { type NextFunction, type Request, type Response } from 'express'
import { type IncomingHttpHeaders } from 'http'
import { GenericError } from '../appError'
import { type TGenericResponse } from '../controllers/types'
import APP_CONFIG from '../appConfig'
import { verify } from 'jsonwebtoken'
import debug from 'debug'

const logVerify = debug('verifyToken')

function parseAuthHeaderForBearerToken(headers: IncomingHttpHeaders): string {
  const regexp = /Bearer (.+)/
  const match = headers.authorization?.match(regexp)?.[1]
  if (match != null) return match

  throw new GenericError('Authorization header is in invalid format')
}

export function verifyTokenAndAttachAsContext(
  req: Request,
  res: Response<TGenericResponse<null>>,
  next: NextFunction
): void {
  const token = parseAuthHeaderForBearerToken(req.headers)
  logVerify('Token received: %s', token)

  verify(token, APP_CONFIG.authSecret, (error, decoded) => {
    logVerify('errors: %s\ndecoded: %s', error, decoded)
    if (error != null) {
      res.status(401).json({
        success: false,
        errors: []
      })
    } else {
      if (typeof decoded !== 'string' && decoded != null) {
        req.context = {
          username: decoded.username,
          email: decoded.email,
          id: decoded.id
        }
      }
      next()
    }
  })
}
