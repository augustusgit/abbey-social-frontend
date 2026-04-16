import { apiClient } from '@/api/client'
import { endpoints } from '@/api/endpoints'
import type { User } from '@/features/users/types'

export async function fetchUsers(): Promise<User[]> {
  const { data } = await apiClient.get<User[]>(endpoints.users.list)
  return data
}
