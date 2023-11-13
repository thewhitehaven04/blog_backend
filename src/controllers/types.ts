import { type TApplicationErrorDto } from '../typings/error'

interface IErrorResponse {
  success: false
  errors: TApplicationErrorDto
}

interface ISuccessfulResponse<T> {
  success: true
  data: T 
}
export type TGenericResponse<T = null> = ISuccessfulResponse<T> | IErrorResponse
