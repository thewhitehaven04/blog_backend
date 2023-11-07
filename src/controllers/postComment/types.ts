import { type TGenericResponse } from '../types'

export type TPostCommentResponseDto = TGenericResponse<{ id: string }>

export interface IPostCommentRequestDto {
  text: string
}