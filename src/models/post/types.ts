import { type Types } from 'mongoose'
import { type IUser } from '../user/types'

export interface IPostModel {
  title: string
  text: string
  author: IUser 
  published: Date
  updated: Date | null
  isPublished: boolean
}

export interface IPostCreateModel {
  title: string
  text: string
  author: Types.ObjectId
  published: Date
}

export interface IPostUpdateModel extends IPostCreateModel {
  updated: Date
}
