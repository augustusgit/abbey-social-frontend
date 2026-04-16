import { createContext } from 'react'
import type { LoginPayload, RegisterPayload } from '@/features/auth/services/authApi'
import type { AuthUser } from '@/types/auth'

export type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  isBootstrapping: boolean
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => Promise<void>
  logoutAll: () => Promise<void>
  replaceUser: (user: AuthUser | null) => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
