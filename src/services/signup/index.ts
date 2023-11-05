import { GenericError } from '../../appError'
import { type ISignUpRequestDto } from '../../controllers/signup/types'
import * as UserRepository from '../../repository/user'

async function signUp(userCredentials: ISignUpRequestDto): Promise<void> {
  const { username, email } = userCredentials
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

  await UserRepository.createUser(userCredentials)
}

export { signUp }
