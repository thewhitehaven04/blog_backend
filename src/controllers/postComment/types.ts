import { type ITransformedCommentDataDto } from '../../services/comment/types'
import { type TGenericResponse } from '../types'

export type TPostCommentResponseDto = TGenericResponse<{ id: string }>

export interface IPostCommentRequestDto {
  text: string
}

export interface ICommentRequestParams {
  count: string 
  offset: string 
}

export type TGetPostCommentResponseDto = TGenericResponse<
  ITransformedCommentDataDto
>
