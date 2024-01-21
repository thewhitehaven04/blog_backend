import { type Types, type Document } from 'mongoose'
import { type IPostModel } from '../../models/post/types'
import { type ISecureUser } from '../../models/user/types'

export type TPostDocument = Document<
  unknown,
  Record<string, unknown>,
  IPostModel
> &
  IPostModel & {
    _id: Types.ObjectId
  }

export type TPopulatedPostDocument = Omit<
  Document<unknown, Record<string, unknown>, IPostModel> &
    IPostModel & {
      _id: Types.ObjectId
    },
  'author'
> & { author: ISecureUser }


export interface IGetPostsQueryParams {
  count: number
  offset: number
  filterPosts?: string[]
}