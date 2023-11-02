import { GenericError } from '../../appError'
import UserModel from '../../models/user'
import { type TUserDocument } from './types'

async function getUser(id: string): Promise<TUserDocument> {
  const user = await UserModel.findById(id).exec()
  if (user != null) return user

  throw new GenericError(
    `Database error: User ${id} has not been found in the database`
  )
}

export { getUser }
