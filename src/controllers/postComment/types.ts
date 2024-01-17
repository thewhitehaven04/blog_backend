import e from 'express'
import { type ITransformedCommentDto } from '../../services/comment/types'
import { type TPaginatedResponse, type TGenericResponse } from '../types/response'

export type TPostCommentResponseDto = TGenericResponse<{ id: string }>

export interface IPostCommentRequestDto {
  text: string
}

export interface ICommentRequestParams {
  count: string 
  offset: string 
}

export type TGetPostCommentResponseDto = TPaginatedResponse<
  ITransformedCommentDto
>