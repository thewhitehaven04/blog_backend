import { type ISecureUser } from '../../models/user/types'

export interface IFormattedPostDto {
  title: string
  text: string
  author: ISecureUser 
  updated: string | null
  published: string
  isPublished: boolean
}

export interface IPostsCollectionDto {
  posts: IFormattedPostDto[],
  totalCount: number
}