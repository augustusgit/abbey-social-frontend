export type AuthUser = {
  id: string
  email: string
  name: string | null
  username: string
}

/** `GET /api/auth/me` — includes nested profile fields. */
export type AuthMeResponse = {
  id: string
  email: string
  name: string | null
  username: string
  profile: {
    bio: string | null
    location: string | null
    website: string | null
    birthday: string | null
  }
}

export type AuthResponse = {
  accessToken: string
  user: AuthUser
}

export type MessageResponse = {
  message: string
}
