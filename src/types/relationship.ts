export type RelationshipUserRow = {
  userId: string
  username: string
  name: string | null
  followedAt: string
}

export type RelationshipStats = {
  followerCount: number
  followingCount: number
}

export type FollowResult = {
  followed: boolean
  alreadyFollowing?: boolean
}

export type UnfollowResult = {
  followed: false
}
