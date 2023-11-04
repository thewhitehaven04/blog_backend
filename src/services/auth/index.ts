import { sign } from 'jsonwebtoken'
import { GenericError } from '../../appError'
import { type IAuthRequestDto } from '../../controllers/auth/types'
import * as UserRepository from './../../repository/user'
import { compare } from 'bcrypt'

async function auth(
  authRequest: IAuthRequestDto,
  success: (token: string) => void
): Promise<string> {
  const user = await UserRepository.getUserByCredentials(authRequest)

  if (user != null) {
    if (
      authRequest.username === user.username &&
      (await compare(authRequest.password, user.password))
    ) {
      sign(authRequest, process.env.AUTH_SECRET ?? '', (err, token) => {
        if (err != null && token != null) success(token)
        else throw new GenericError('Signing error')
      })
    } else {
      throw new GenericError('Password mismatch')
    }
  }
  throw new GenericError('No user')
}

export { auth }
