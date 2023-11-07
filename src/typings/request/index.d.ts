export interface IUserContext {
  userId: string | null
}  

declare global {
  namespace Express {
    interface Request {
      context: IUserContext
    }
  }
}