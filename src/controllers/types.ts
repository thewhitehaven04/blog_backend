import { type IApplicationError } from '../typings/error'

export interface IGenericResponse<T> {
  success: boolean
  errors: IApplicationError[] | null 
  data: T[] | T | null
}