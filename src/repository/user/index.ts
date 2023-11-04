import { GenericError } from '../../appError'
import UserModel from '../../models/user'
import { type IUserCredentials, type TUserDocument } from './types'

async function getUser(id: string): Promise<TUserDocument> {
  const user = await UserModel.findById(id).exec()
  if (user != null) return user

  throw new GenericError(
    `Database error: User ${id} has not been found in the database`
  )
}

async function getUserByCredentials(
  credentials: IUserCredentials
): Promise<TUserDocument | null> {
  return (await UserModel.findOne(credentials).exec())
}

export { getUser, getUserByCredentials }
