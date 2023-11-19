import { type Types } from 'mongoose'
import { type IUserModel } from '../user/types'

export interface IPostModel {
  title: string
  text: string
  author: IUserModel 
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

export interface IPostUpdateModel {
  title?: string
  text?: string
  updated: Date
}
