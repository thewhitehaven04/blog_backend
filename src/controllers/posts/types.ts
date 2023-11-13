import { type IFormattedPostDto } from '../../services/posts/types'
import { type TGenericResponse } from '../types'

export interface ICreatePostRequestDto {
  title: string
  text: string
  author: string
  published: string
}

export interface IUpdatePostRequestDto extends ICreatePostRequestDto {
  updated: string
}

export interface IGetPostsRequestParamsDto {
  offset: number
  count: number
}

export type TPostsCollectionResponseDto = TGenericResponse<IFormattedPostDto[]>

export type TPostCreateResponseDto = TGenericResponse<IFormattedPostDto>

export type TPostUpdateResponseDto = TGenericResponse
