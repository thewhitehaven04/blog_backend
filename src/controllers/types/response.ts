import { type TApplicationErrorDto } from '../../typings/error'
import { type IPaginationDto } from './pagination'


interface IErrorResponse {
  success: false
  errors: TApplicationErrorDto
}
interface ISuccessfulResponse<T> {
  success: true
  data: T
}
interface ISuccessfulPaginatedResponse<T> {
  success: true
  data: T[]
  pagination: IPaginationDto
}
export type TGenericResponse<T = null> = ISuccessfulResponse<T> | IErrorResponse

export type TPaginatedResponse<T> = ISuccessfulPaginatedResponse<T> |
  IErrorResponse
