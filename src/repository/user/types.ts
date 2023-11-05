import { type Document, type Types } from 'mongoose'
import { type ISecureUser, type IUser } from '../../models/user/types'

export type TUserDocument = Document<unknown, Record<string, unknown>, IUser> &
  IUser & { _id: Types.ObjectId }

export type TSecureUserDocument = Document<
  unknown,
  Record<string, unknown>,
  ISecureUser
> &
  IUser & { _id: Types.ObjectId }

export interface IUserCredentials {
  username: string
  password: string
}
