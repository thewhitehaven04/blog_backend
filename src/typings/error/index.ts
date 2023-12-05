import { type ValidationError } from 'express-validator'

interface IGenericError {
  message: string
  cause: unknown 
} 

export type TApplicationErrorDto = IGenericError[] | ValidationError[] 
