import { type IGenericResponse } from '../types'

export interface ICreatePostRequestDto {
  title: string
  text: string
  author: string
  timestamp: string
  publishDate: string
}

export interface ICreatePostResponseDto extends IGenericResponse {
  data: {
    id: string
  }
}