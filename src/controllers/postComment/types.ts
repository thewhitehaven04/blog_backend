import { type ITransformedCommentDto } from '../../services/comment/types'
import { type TPaginatedResponse, type TGenericResponse } from '../types/response'

export type TPostCommentResponseDto = TGenericResponse<{ id: string }>

export interface IPostCommentRequestDto {
  postId: string
  text: string
}

export interface ICommentRequestParams {
  postId: string
  count: string 
  offset: string 
}

export type TGetPostCommentResponseDto = TPaginatedResponse<
  ITransformedCommentDto
>

export interface IUpdateCommentRequestDto {
  text: string
}