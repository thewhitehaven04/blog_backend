import { type NextFunction, type Request, type Response } from 'express'

export function userContext(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  req.context = { userId: null }
  next()
}
