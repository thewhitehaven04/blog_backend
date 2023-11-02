import { type Types, type Document } from 'mongoose'
import { type IPost } from '../../models/post/types'

export type TPostDocument = Promise<
  Document<unknown, Record<string, unknown>, IPost> &
    IPost & { _id: Types.ObjectId }
>
