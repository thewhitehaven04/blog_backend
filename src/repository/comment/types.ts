import { type Document, type Types } from 'mongoose'
import { type ICommentModel } from '../../models/comment/types'

export type TCommentDocument = Document<
  unknown,
  Record<string, unknown>,
  ICommentModel
> &
  ICommentModel & {
    _id: Types.ObjectId
  }
