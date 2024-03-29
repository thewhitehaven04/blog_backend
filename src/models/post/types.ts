import { type Types } from 'mongoose'
import { type ISecureUser } from '../user/types'

export interface IPostModel {
  title: string
  text: string
  summary: string
  author: Types.ObjectId 
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
  summary: string
  author: Types.ObjectId
  published: Date
}

export interface IPostUpdateModel {
  title?: string
  text?: string
  summary?: string
  updated: Date
}
