interface IGenericError {
  message: string
  cause: unknown
}

export interface ISerializedValidationError {
  message: string
}

export type TApplicationErrorDto =
  | IGenericError[]
  | ISerializedValidationError[]
