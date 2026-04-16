import axios from 'axios'
import { getApiBaseUrl } from '@/app/config/env'

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)
