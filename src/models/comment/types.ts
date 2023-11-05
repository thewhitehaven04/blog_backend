import { type Types } from 'mongoose'

export interface ICommentModel {
  text: string
  created: Date
  author: Types.ObjectId 
  post: Types.ObjectId 
}