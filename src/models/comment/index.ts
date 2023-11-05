import { Schema, Types, model } from 'mongoose'
import { type ICommentModel } from './types'

const CommentSchema = new Schema<ICommentModel>({
  text: {type: String, required: true }, 
  created: {type: Date, required: true },
  author: String,
  post: { type: Types.ObjectId, ref: 'post', required: true }
})

const CommentModel = model('comment', CommentSchema)

export default CommentModel