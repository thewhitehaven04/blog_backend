import {  type IFormattedPostDto } from '../../services/posts/types'
import { type TPaginatedResponse, type TGenericResponse } from '../types/response'

export interface ICreatePostRequestDto {
  title: string
  text: string
  author: string
  summary: string
  published: string
}

export interface IUpdatePostRequestDto {
  title?: string
  text?: string
  summary?: string
}

export interface IGetPostsRequestParamsDto {
  offset: number
  count: number
}

export type TPostsCollectionResponseDto = TPaginatedResponse<IFormattedPostDto>

export type TPostCreateResponseDto = TGenericResponse<IFormattedPostDto>

export type TPostUpdateResponseDto = TGenericResponse

export type TPostResponseDto = TGenericResponse<IFormattedPostDto>