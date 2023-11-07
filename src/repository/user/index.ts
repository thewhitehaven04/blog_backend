import { GenericError } from '../../appError'
import { type ISignUpRequestDto } from '../../controllers/signup/types'
import UserModel from '../../models/user'
import { type IUserModel } from '../../models/user/types'
import {
  type IUserCredentials,
  type TSecureUserDocument,
  type TUserDocument
} from './types'

async function createUser(user: IUserModel): Promise<TUserDocument> {
  return await UserModel.create(user)
}

async function getUser(id: string): Promise<TUserDocument> {
  const user = await UserModel.findById(id).exec()
  if (user != null) return user

  throw new GenericError(
    `Database error: User ${id} has not been found in the database`
  )
}

async function getUserWithoutCredentials(
  id: string
): Promise<TSecureUserDocument | null> {
  return await UserModel.findById(id, 'username email').exec()
}

async function getUserByUsername(
  username: string
): Promise<TUserDocument | null> {
  return await UserModel.findOne({ username }).exec()
}

async function getUserByCredentials(userCredentials: {
  username: string
  email: string
}): Promise<TUserDocument[]> {
  return await UserModel.find({
    $or: [
      { email: userCredentials.email },
      { username: userCredentials.username }
    ]
  }).exec()
}

export {
  getUser,
  getUserByCredentials,
  getUserWithoutCredentials,
  createUser,
  getUserByUsername
}
