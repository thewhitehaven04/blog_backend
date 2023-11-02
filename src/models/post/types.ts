import { type ObjectId } from 'mongoose'

export interface IPost {
  title: string
  text: string
  author: ObjectId
  timestamp: Date
  publishDate: Date,
  isPublished: boolean
}