import { apiClient } from '@/api/client'
import { endpoints } from '@/api/endpoints'
import type {
  FollowResult,
  RelationshipStats,
  RelationshipUserRow,
  UnfollowResult,
} from '@/types/relationship'

export async function followUser(userId: string): Promise<FollowResult> {
  const { data } = await apiClient.post<FollowResult>(endpoints.relationships.follow(userId))
  return data
}

export async function unfollowUser(userId: string): Promise<UnfollowResult> {
  const { data } = await apiClient.delete<UnfollowResult>(endpoints.relationships.unfollow(userId))
  return data
}

export async function fetchFollowers(userId: string): Promise<RelationshipUserRow[]> {
  const { data } = await apiClient.get<RelationshipUserRow[]>(endpoints.relationships.followers(userId))
  return data
}

export async function fetchFollowing(userId: string): Promise<RelationshipUserRow[]> {
  const { data } = await apiClient.get<RelationshipUserRow[]>(endpoints.relationships.following(userId))
  return data
}

export async function fetchMyRelationshipStats(): Promise<RelationshipStats> {
  const { data } = await apiClient.get<RelationshipStats>(endpoints.relationships.myStats)
  return data
}
