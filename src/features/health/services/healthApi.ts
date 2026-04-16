import { apiClient } from '@/api/client'
import { endpoints } from '@/api/endpoints'
import type { HealthStatus } from '@/types/health'

export async function fetchHealth(): Promise<HealthStatus> {
  const { data } = await apiClient.get<HealthStatus>(endpoints.health, { skipAuth: true })
  return data
}
