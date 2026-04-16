import { useCallback, useEffect, useMemo, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { AuthContext, type AuthContextValue } from '@/app/providers/auth-context'
import { queryClient } from '@/app/queryClient'
import {
  login as loginRequest,
  logout as logoutRequest,
  logoutAll as logoutAllRequest,
  register as registerRequest,
  type LoginPayload,
  type RegisterPayload,
} from '@/features/auth/services/authApi'
import { bootstrapAuthSession } from '@/lib/authBootstrap'
import type { AuthUser } from '@/types/auth'

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready'>('loading')

  useEffect(() => {
    let cancelled = false

    void bootstrapAuthSession().then((nextUser) => {
      if (!cancelled) {
        setUser(nextUser)
        setStatus('ready')
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (payload: LoginPayload) => {
    const data = await loginRequest(payload)
    setUser(data.user)
    await queryClient.invalidateQueries()
  }, [])

  const register = useCallback(async (payload: RegisterPayload) => {
    const data = await registerRequest(payload)
    setUser(data.user)
    await queryClient.invalidateQueries()
  }, [])

  const logout = useCallback(async () => {
    try {
      await logoutRequest()
    } finally {
      setUser(null)
      queryClient.clear()
    }
  }, [])

  const logoutAll = useCallback(async () => {
    await logoutAllRequest()
    setUser(null)
    queryClient.clear()
  }, [])

  const replaceUser = useCallback((next: AuthUser | null) => {
    setUser(next)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isBootstrapping: status === 'loading',
      login,
      register,
      logout,
      logoutAll,
      replaceUser,
    }),
    [user, status, login, register, logout, logoutAll, replaceUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
