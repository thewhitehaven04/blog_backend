import { GenericError } from '../../appError'
import UserModel from '../../models/user'
import { type TSecureUserDocument, type TUserDocument } from './types'

async function getUser(id: string): Promise<TUserDocument> {
  const user = await UserModel.findById(id).exec()
  if (user != null) return user

  throw new GenericError(
    `Database error: User ${id} has not been found in the database`
  )
}

async function getUserWithoutCredentials(
  id: string
): Promise<TSecureUserDocument> {
  const user = await UserModel.findById(id, 'username email').exec()
  if (user != null) return user

  throw new GenericError(
    `Database error: User ${id} has not been found in the database`
  )
}

async function getUserByUsername(
  username: string
): Promise<TUserDocument | null> {
  return await UserModel.findOne({ username }).exec()
}

export { getUser, getUserByUsername, getUserWithoutCredentials }
