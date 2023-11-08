import "jsonwebtoken"

declare module "jsonwebtoken" {
  export interface JwtPayload {
    username: string
    email: string
    id: string
  }
}