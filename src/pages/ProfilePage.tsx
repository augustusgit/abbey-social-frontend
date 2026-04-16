import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/common/Button'
import { cn } from '@/utils/cn'
import { fetchPublicAccount } from '@/features/account/services/accountApi'
import { fetchFollowing, followUser, unfollowUser } from '@/features/relationships/services/relationshipApi'
import { getErrorMessage } from '@/utils/apiError'

export default function ProfilePage() {
  const { userId = '' } = useParams<{ userId: string }>()
  const { user: authUser, isAuthenticated } = useAuth()
  const queryClient = useQueryClient()

  const profileQuery = useQuery({
    queryKey: ['account', 'public', userId],
    queryFn: () => fetchPublicAccount(userId),
    enabled: !!userId,
  })

  const followingQuery = useQuery({
    queryKey: ['relationships', 'following', authUser?.id],
    queryFn: () => fetchFollowing(authUser!.id),
    enabled: !!authUser && !!userId && authUser.id !== userId,
  })

  const isSelf = !!authUser && authUser.id === userId
  const isFollowing =
    followingQuery.data?.some((row) => row.userId === userId) ?? false

  const followMutation = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error('Missing user')
      if (isFollowing) {
        return unfollowUser(userId)
      }
      return followUser(userId)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['account', 'public', userId] })
      await queryClient.invalidateQueries({ queryKey: ['relationships', 'stats'] })
      await queryClient.invalidateQueries({ queryKey: ['relationships', 'following', authUser?.id] })
    },
  })

  if (!userId) {
    return <p className="text-slate-600 dark:text-slate-400">Invalid profile link.</p>
  }

  if (profileQuery.isPending) {
    return <p className="text-slate-600 dark:text-slate-400">Loading profile…</p>
  }

  if (profileQuery.isError || !profileQuery.data) {
    return (
      <p className="rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
        {profileQuery.isError ? getErrorMessage(profileQuery.error, 'User not found') : 'User not found.'}
      </p>
    )
  }

  const p = profileQuery.data

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 border-b border-slate-200 pb-8 dark:border-slate-700 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{p.name ?? p.username}</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">@{p.username}</p>
          {p.bio && <p className="max-w-xl text-slate-700 dark:text-slate-300">{p.bio}</p>}
          <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
            {p.location && <span>{p.location}</span>}
            {p.website && (
              <a
                href={p.website}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                {p.website.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          {isSelf ? (
            <Link
              to="/settings"
              className={cn(
                'inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
              )}
            >
              Edit profile
            </Link>
          ) : (
            isAuthenticated && (
              <Button
                type="button"
                variant={isFollowing ? 'secondary' : 'primary'}
                disabled={
                  followMutation.isPending ||
                  (!!authUser && !isSelf && followingQuery.isFetching)
                }
                onClick={() => followMutation.mutate()}
              >
                {followMutation.isPending
                  ? '…'
                  : isFollowing
                    ? 'Unfollow'
                    : 'Follow'}
              </Button>
            )
          )}
          {followMutation.isError && (
            <p className="text-sm text-red-600 dark:text-red-400">{getErrorMessage(followMutation.error)}</p>
          )}
        </div>
      </header>

      <div className="flex flex-wrap gap-8">
        <Link
          to={`/profile/${userId}/followers`}
          className="group rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-indigo-600"
        >
          <p className="text-2xl font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-slate-100 dark:group-hover:text-indigo-400">
            {p.followerCount}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Followers</p>
        </Link>
        <Link
          to={`/profile/${userId}/following`}
          className="group rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-indigo-600"
        >
          <p className="text-2xl font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-slate-100 dark:group-hover:text-indigo-400">
            {p.followingCount}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Following</p>
        </Link>
      </div>
    </div>
  )
}
