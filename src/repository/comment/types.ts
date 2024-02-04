import { type Document, type Types } from 'mongoose'
import { type ICommentModel } from '../../models/comment/types'
import { type ISecureUser } from '../../models/user/types'

export type TCommentDocument = Document<
  unknown,
  Record<string, unknown>,
  ICommentModel
> &
  ICommentModel & {
    _id: Types.ObjectId
  }

export type TPopulatedCommentDocument = Omit<
  Document<unknown, Record<string, unknown>, ICommentModel> &
    ICommentModel & {
      _id: Types.ObjectId
    },
  'author'
> & {
  author: ISecureUser
}