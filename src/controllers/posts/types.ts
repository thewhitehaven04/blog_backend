import { type IPostsCollectionDto, type IFormattedPostDto } from '../../services/posts/types'
import { IPostCommentRequestDto } from '../postComment/types'
import { type TGenericResponse } from '../types/response'

export interface ICreatePostRequestDto {
  title: string
  text: string
  author: string
  published: string
}

export interface IUpdatePostRequestDto {
  title?: string,
  text?: string
}

export interface IGetPostsRequestParamsDto {
  offset: number
  count: number
}

export type TPostsCollectionResponseDto = TGenericResponse<IPostsCollectionDto>

export type TPostCreateResponseDto = TGenericResponse<IFormattedPostDto>

export type TPostUpdateResponseDto = TGenericResponse

export type TPostResponseDto = TGenericResponse<IFormattedPostDto>