import { type ObjectId } from 'mongoose'

export interface IComment {
  text: string
  timestamp: Date
  author: ObjectId
  post: ObjectId
}