import { refreshSession } from '@/features/auth/services/authApi'
import { setAccessToken } from '@/lib/authToken'
import type { AuthUser } from '@/types/auth'

let bootstrapPromise: Promise<AuthUser | null> | null = null

/**
 * Runs session restore once per page load so React Strict Mode does not call
 * `/auth/refresh` twice (which would invalidate the first rotated refresh cookie).
 */
export function bootstrapAuthSession(): Promise<AuthUser | null> {
  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      try {
        const data = await refreshSession()
        return data.user
      } catch {
        setAccessToken(null)
        return null
      }
    })()
  }
  return bootstrapPromise
}
