export interface IUserContext {
  id: string
  username: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      context: IUserContext
    }
  }
}
