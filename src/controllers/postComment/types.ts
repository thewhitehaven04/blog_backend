import { type IGenericResponse } from '../types'

export type TPostCommentResponseDto = IGenericResponse<{ id: string }>

export interface IPostCommentRequestDto {
  text: string
}