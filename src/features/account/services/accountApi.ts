import { apiClient } from '@/api/client'
import { endpoints } from '@/api/endpoints'
import type { MyAccount, PublicAccount, UpdateAccountPayload } from '@/types/account'

export async function fetchMyAccount(): Promise<MyAccount> {
  const { data } = await apiClient.get<MyAccount>(endpoints.accounts.me)
  return data
}

export async function updateMyAccount(payload: UpdateAccountPayload): Promise<MyAccount> {
  const { data } = await apiClient.put<MyAccount>(endpoints.accounts.me, payload)
  return data
}

export async function fetchPublicAccount(userId: string): Promise<PublicAccount> {
  const { data } = await apiClient.get<PublicAccount>(endpoints.accounts.byUserId(userId))
  return data
}
