import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '@/features/users/services/usersApi'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}
