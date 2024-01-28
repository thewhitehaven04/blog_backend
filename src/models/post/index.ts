import { Schema, model } from 'mongoose'
import { type IPostModel } from './types'

const PostSchema = new Schema<IPostModel>({
  text: { type: String, required: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  published: { type: Date, required: true },
  updated: { type: Date, required: true }
})

PostSchema.virtual('isPublished').get(function () {
  return this.published < new Date()
})

PostSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
})

const PostModel = model('post', PostSchema)

export default PostModel
