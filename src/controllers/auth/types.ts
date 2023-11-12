import { type TGenericResponse } from '../types'

export interface IAuthRequestDto {
  username: string
  password: string
}

interface IAuthResponseDto {
  token: string
}

export type TAuthResponseDto = TGenericResponse<IAuthResponseDto>
