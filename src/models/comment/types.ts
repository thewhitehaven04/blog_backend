import { type ObjectId } from 'mongoose'

export interface ICommentModel {
  text: string
  created: Date
  author: string 
  post: ObjectId
}