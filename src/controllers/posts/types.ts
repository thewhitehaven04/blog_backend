import { type IFormattedPostDto } from '../../services/posts/types'
import { type IGenericResponse } from '../types'

export interface ICreatePostRequestDto {
  title: string
  text: string
  author: string
  timestamp: number 
  published: string
}

export interface IUpdatePostRequestDto extends ICreatePostRequestDto {
  updated: string
}

export type TPostCreateResponseDto = IGenericResponse<IFormattedPostDto>

export type TPostUpdateResponseDto = IGenericResponse<IFormattedPostDto>
