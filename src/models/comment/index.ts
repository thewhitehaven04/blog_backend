import { Schema, model } from 'mongoose'
import { type ICommentModel } from './types'

const CommentSchema = new Schema<ICommentModel>({
  text: { type: String, required: true },
  created: { type: Date, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'post', required: true }
})

const CommentModel = model('comment', CommentSchema)

export default CommentModel
