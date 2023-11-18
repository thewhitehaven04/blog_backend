import { type TGenericResponse } from '../types'

export interface IAuthRequestDto {
  username: string
  password: string
}

export interface IRefreshTokenRequestDto {
  refreshToken: string
}

interface IAuthResponseDto {
  token: string
}

export type TAuthResponseDto = TGenericResponse<IAuthResponseDto>
