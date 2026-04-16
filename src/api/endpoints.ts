/** Central place for API path segments — adjust to match your Express routes. */
export const endpoints = {
  users: {
    list: '/api/users',
    detail: (id: string) => `/api/users/${id}` as const,
  },
} as const
