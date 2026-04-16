import { apiClient } from '@/api/client'
import { endpoints } from '@/api/endpoints'
import { setAccessToken } from '@/lib/authToken'
import type { AuthMeResponse, AuthResponse, MessageResponse } from '@/types/auth'

export type RegisterPayload = {
  email: string
  password: string
  username: string
  name?: string
}

export type LoginPayload = {
  email: string
  password: string
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(endpoints.auth.register, payload, { skipAuth: true })
  setAccessToken(data.accessToken)
  return data
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(endpoints.auth.login, payload, { skipAuth: true })
  setAccessToken(data.accessToken)
  return data
}

export async function refreshSession(): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(endpoints.auth.refresh, {}, { skipAuth: true })
  setAccessToken(data.accessToken)
  return data
}

export async function logout(): Promise<void> {
  await apiClient.post<MessageResponse>(endpoints.auth.logout, {}, { skipAuth: true })
  setAccessToken(null)
}

export async function logoutAll(): Promise<MessageResponse> {
  const { data } = await apiClient.post<MessageResponse>(endpoints.auth.logoutAll)
  setAccessToken(null)
  return data
}

export async function fetchAuthMe(): Promise<AuthMeResponse> {
  const { data } = await apiClient.get<AuthMeResponse>(endpoints.auth.me)
  return data
}
