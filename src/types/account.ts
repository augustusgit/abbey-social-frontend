export type MyAccount = {
  id: string
  email: string
  name: string | null
  username: string
  bio: string | null
  location: string | null
  website: string | null
  /** ISO date string from API */
  birthday: string | null
}

export type PublicAccount = {
  id: string
  name: string | null
  username: string
  bio: string | null
  location: string | null
  website: string | null
  followerCount: number
  followingCount: number
}

export type UpdateAccountPayload = {
  name?: string
  username?: string
  bio?: string | null
  location?: string | null
  website?: string | null
  birthday?: string | null
}
