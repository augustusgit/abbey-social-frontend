/** Matches Express routers mounted at `/api`. */
export const endpoints = {
  health: '/api/health',
  auth: {
    register: '/api/auth/register',
    login: '/api/auth/login',
    refresh: '/api/auth/refresh',
    logout: '/api/auth/logout',
    logoutAll: '/api/auth/logout-all',
    me: '/api/auth/me',
  },
  accounts: {
    me: '/api/accounts/me',
    byUserId: (userId: string) => `/api/accounts/${encodeURIComponent(userId)}` as const,
  },
  relationships: {
    follow: (userId: string) => `/api/relationships/follow/${encodeURIComponent(userId)}` as const,
    unfollow: (userId: string) => `/api/relationships/follow/${encodeURIComponent(userId)}` as const,
    followers: (userId: string) =>
      `/api/relationships/followers/${encodeURIComponent(userId)}` as const,
    following: (userId: string) =>
      `/api/relationships/following/${encodeURIComponent(userId)}` as const,
    myStats: '/api/relationships/me/stats',
  },
} as const
