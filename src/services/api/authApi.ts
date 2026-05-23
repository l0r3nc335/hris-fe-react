import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { AuthTokens, User } from '@/types'

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResult {
  user: User
  tokens: AuthTokens
}

export async function login(payload: LoginPayload): Promise<LoginResult> {
  const res = await httpClient.post<ApiResponse<LoginResult>>(endpoints.auth.login, payload)
  return res.data.data
}

export async function logout(): Promise<void> {
  await httpClient.post(endpoints.auth.logout)
}

export async function refreshToken(token: string): Promise<AuthTokens> {
  const res = await httpClient.post<ApiResponse<AuthTokens>>(endpoints.auth.refresh, {
    refreshToken: token,
  })
  return res.data.data
}

export async function fetchMe(): Promise<User> {
  const res = await httpClient.get<ApiResponse<User>>(endpoints.auth.me)
  return res.data.data
}

export async function register(payload: {
  email: string
  password: string
  firstName: string
  lastName: string
}): Promise<User> {
  const res = await httpClient.post<ApiResponse<User>>(endpoints.auth.register, payload)
  return res.data.data
}

export async function forgotPassword(email: string): Promise<void> {
  await httpClient.post(endpoints.auth.forgotPassword, { email })
}

export async function resetPassword(payload: {
  token: string
  password: string
}): Promise<void> {
  await httpClient.post(endpoints.auth.resetPassword, payload)
}
