import { type IApplicationError } from '../typings/error'

export interface IGenericResponse {
  success: boolean
  errors: IApplicationError[] | null 
}