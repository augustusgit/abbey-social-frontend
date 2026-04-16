import axios, { isAxiosError } from 'axios'
import { getApiBaseUrl } from '@/app/config/env'
import { endpoints } from '@/api/endpoints'
import { getAccessToken, setAccessToken } from '@/lib/authToken'
import type { AuthResponse } from '@/types/auth'

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
  if (config.skipAuth) return config
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!isAxiosError(error) || !error.config) {
      return Promise.reject(error)
    }

    const config = error.config
    const status = error.response?.status

    if (status !== 401 || config._retry) {
      return Promise.reject(error)
    }

    const url = String(config.url ?? '')
    if (
      url.includes('/auth/refresh') ||
      url.includes('/auth/login') ||
      url.includes('/auth/register')
    ) {
      return Promise.reject(error)
    }

    config._retry = true

    try {
      const { data } = await apiClient.post<AuthResponse>(endpoints.auth.refresh, {}, { skipAuth: true })
      setAccessToken(data.accessToken)
      config.headers.Authorization = `Bearer ${data.accessToken}`
      return apiClient.request(config)
    } catch {
      setAccessToken(null)
      return Promise.reject(error)
    }
  },
)
