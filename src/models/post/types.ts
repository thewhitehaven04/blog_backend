import { type Types } from 'mongoose'
import { type ISecureUser, type IUserModel } from '../user/types'

export interface IPostModel {
  title: string
  text: string
  summary: string
  author: IUserModel 
  published: Date
  updated: Date | null
  isPublished: boolean
}

export interface IPostReadModel extends Omit<IPostModel, 'author'> {
  author: ISecureUser
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
