import { type TApplicationErrorDto } from './typings/error'

export class GenericError extends Error {
  serialize(): TApplicationErrorDto {
    return {
      message: this.message,
      cause: this.cause
    }
  }
}
