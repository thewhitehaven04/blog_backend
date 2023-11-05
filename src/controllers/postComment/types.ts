import { type IGenericResponse } from '../types'

export type TPostCommentResponseDto = IGenericResponse<{ id: string }>

export interface IPostCommentRequestDto {
  text: string
  author: string
}

export interface IUpdateCommentRequestDto {
  text: string
}
