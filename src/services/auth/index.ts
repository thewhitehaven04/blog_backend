import { sign } from 'jsonwebtoken'
import { GenericError } from '../../appError'
import { type IAuthRequestDto } from '../../controllers/auth/types'
import * as UserRepository from './../../repository/user'
import { compare } from 'bcrypt'
import APP_CONFIG from '../../appConfig'

async function auth(
  authRequest: IAuthRequestDto,
  success: (token: string) => void
): Promise<void> {
  const user = await UserRepository.getUserByUsername(authRequest.username)

  if (user != null) {
    if (
      authRequest.username === user.username &&
      (await compare(authRequest.password, user.password))
    ) {
      const jwtPayload = {
        username: user.username,
        id: user.id,
        email: user.email
      }
      
      sign(
        jwtPayload,
        APP_CONFIG.authSecret,
        (err, token) => {
          if (err === null && token != null) {
            success(token)
            return
          }
          throw new GenericError('Signing error')
        }
      )
    } else {
      throw new GenericError('Password mismatch')
    }
    return
  }
  throw new GenericError('No user')
}

export { auth }
