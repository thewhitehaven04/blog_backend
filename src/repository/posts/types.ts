import { type Types, type Document } from 'mongoose'
import { type IPostModel } from '../../models/post/types'

export type TPostDocument = Document<
  unknown,
  Record<string, unknown>,
  IPostModel
> &
  IPostModel & {
    _id: Types.ObjectId
  }
