import { hash } from 'bcrypt'
import { GenericError } from '../../appError'
import { type ISignUpRequestDto } from '../../controllers/signup/types'
import * as UserRepository from '../../repository/user'
import APP_CONFIG from '../../appConfig'

async function signUp(userCredentials: ISignUpRequestDto): Promise<void> {
  const { username, email, password } = userCredentials
  const usersWithDuplicateCredentials =
    await UserRepository.getUserByCredentials({ username, email })

  const userWithDuplicateEmail = usersWithDuplicateCredentials.find(
    (user) => user.email === email
  )
  const userWithDuplicateUsername = usersWithDuplicateCredentials.find(
    (user) => user.username === username
  )

  if (userWithDuplicateEmail != null)
    throw new GenericError(
      `There is already a registered user with this email: ${email}`
    )

  if (userWithDuplicateUsername != null)
    throw new GenericError(
      `There is already a registered user with this username: ${username}`
    )

  const hashedPassword = await hash(password, APP_CONFIG.salt)

  await UserRepository.createUser({
    ...userCredentials,
    password: hashedPassword
  })
}

export { signUp }
