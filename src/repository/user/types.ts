import { type Document, type Types } from 'mongoose'
import { type ISecureUser, type IUserModel } from '../../models/user/types'

export type TUserDocument = Document<unknown, Record<string, unknown>, IUserModel> &
  IUserModel & { _id: Types.ObjectId }

export type TSecureUserDocument = Document<
  unknown,
  Record<string, unknown>,
  ISecureUser
> &
  IUserModel & { _id: Types.ObjectId }

export interface IUserCredentials {
  username: string
  password: string
}
