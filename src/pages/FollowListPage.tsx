import { useQuery } from '@tanstack/react-query'
import { Link, useLocation, useParams } from 'react-router-dom'
import { fetchFollowers, fetchFollowing } from '@/features/relationships/services/relationshipApi'
import { getErrorMessage } from '@/utils/apiError'

export default function FollowListPage() {
  const { userId = '' } = useParams<{ userId: string }>()
  const { pathname } = useLocation()
  const mode = pathname.includes('/followers') ? 'followers' : 'following'

  const query = useQuery({
    queryKey: ['relationships', mode, userId],
    queryFn: () =>
      mode === 'followers' ? fetchFollowers(userId) : fetchFollowing(userId),
    enabled: !!userId,
  })

  const title = mode === 'followers' ? 'Followers' : 'Following'

  return (
    <div className="space-y-6">
      <div>
        <Link
          to={`/profile/${userId}`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          ← Back to profile
        </Link>
        <h1 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-slate-100">{title}</h1>
      </div>

      {query.isPending && <p className="text-slate-600 dark:text-slate-400">Loading…</p>}
      {query.isError && (
        <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {getErrorMessage(query.error, 'Could not load list')}
        </p>
      )}
      {query.data && query.data.length === 0 && (
        <p className="text-slate-600 dark:text-slate-400">No users in this list yet.</p>
      )}
      {query.data && query.data.length > 0 && (
        <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-950">
          {query.data.map((row) => (
            <li key={row.userId}>
              <Link
                to={`/profile/${row.userId}`}
                className="flex items-center justify-between gap-4 px-4 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{row.name ?? row.username}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">@{row.username}</p>
                </div>
                <span className="text-xs text-slate-400">
                  {new Date(row.followedAt).toLocaleDateString()}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
