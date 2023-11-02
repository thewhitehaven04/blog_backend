import { type Document, type Types } from 'mongoose'
import { type IUser } from '../../models/user/types'

export type TUserDocument = Promise<
  Document<unknown, Record<string, unknown>, IUser> &
    IUser & { _id: Types.ObjectId }
>
