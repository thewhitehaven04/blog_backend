export interface IGenericError {
  text: string
}

export interface IGenericResponse {
  success: boolean
  errors: IGenericError[] | null 
}