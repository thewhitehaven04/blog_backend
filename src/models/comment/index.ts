import { Schema, Types, model } from 'mongoose'
import { type IComment } from './types'

const CommentSchema = new Schema<IComment>({
  text: {type: String, required: true }, 
  timestamp: {type: Date, required: true },
  author: { type: Types.ObjectId, ref: 'user', required: true },
  post: { type: Types.ObjectId, ref: 'post', required: true }
})

const CommentModel = model('comment', CommentSchema)

export default CommentModel