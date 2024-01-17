import { type TGenericResponse } from '../types/response'

export interface IAuthRequestDto {
  username: string
  password: string
}

interface IAuthResponseDto {
  token: string
}

export type TAuthResponseDto = TGenericResponse<IAuthResponseDto>
