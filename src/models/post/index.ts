import { Schema, Types, model } from 'mongoose'
import { type IPost } from './types'

const PostSchema = new Schema<IPost>({
  text: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: Types.ObjectId, ref: 'user', required: true },
  timestamp: { type: Date, required: true },
  publishDate: { type: Date, required: true }
})

PostSchema.virtual('isPublished').get(function() {
  return this.publishDate < new Date()
})

const PostModel = model('post', PostSchema)

export default PostModel
