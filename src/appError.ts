import { type IApplicationError } from './typings/error'

export class GenericError extends Error {
  serialize(): IApplicationError {
    return {
      data: {
        message: this.message,
        cause: this.cause
      }
    }
  }
}
