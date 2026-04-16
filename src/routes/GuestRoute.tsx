import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { PageSpinner } from '@/components/common/PageSpinner'

type Props = {
  children: ReactNode
}

export function GuestRoute({ children }: Props) {
  const { isAuthenticated, isBootstrapping } = useAuth()

  if (isBootstrapping) {
    return <PageSpinner />
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return children
}
