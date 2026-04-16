import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import { Button } from '@/components/common/Button'
import { fetchHealth } from '@/features/health/services/healthApi'
import { fetchMyRelationshipStats } from '@/features/relationships/services/relationshipApi'

export default function DashboardPage() {
  const { user, logoutAll } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const statsQuery = useQuery({
    queryKey: ['relationships', 'stats'],
    queryFn: fetchMyRelationshipStats,
  })

  const healthQuery = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
    staleTime: 30 * 1000,
  })

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Hello{user?.name ? `, ${user.name}` : ''}{user?.username ? ` (@${user.username})` : ''}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Your session uses JWT access tokens and an httpOnly refresh cookie from the Abbey Social API.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to={user ? `/profile/${user.id}` : '#'}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-indigo-600"
        >
          <h2 className="font-medium text-slate-900 dark:text-slate-100">Public profile</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">View how others see you</p>
        </Link>
        <Link
          to="/settings"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-indigo-600"
        >
          <h2 className="font-medium text-slate-900 dark:text-slate-100">Account settings</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Name, bio, location, website</p>
        </Link>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950">
          <h2 className="font-medium text-slate-900 dark:text-slate-100">API health</h2>
          {healthQuery.isPending && <p className="mt-2 text-sm text-slate-500">Checking…</p>}
          {healthQuery.data && (
            <p className="mt-2 text-sm text-green-700 dark:text-green-400">
              {healthQuery.data.status} · DB {healthQuery.data.database}
            </p>
          )}
          {healthQuery.isError && (
            <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">Could not reach /api/health</p>
          )}
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950">
        <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100">Your network</h2>
        {statsQuery.isPending && <p className="mt-2 text-slate-600 dark:text-slate-400">Loading stats…</p>}
        {statsQuery.data && (
          <div className="mt-4 flex flex-wrap gap-6">
            <div>
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {statsQuery.data.followerCount}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Followers</p>
              {user && (
                <Link
                  to={`/profile/${user.id}/followers`}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                  View list
                </Link>
              )}
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {statsQuery.data.followingCount}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Following</p>
              {user && (
                <Link
                  to={`/profile/${user.id}/following`}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                  View list
                </Link>
              )}
            </div>
          </div>
        )}
        {statsQuery.isError && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">Could not load relationship stats.</p>
        )}
      </section>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={async () => {
            try {
              await logoutAll()
              toast.success('All sessions logged out')
              void navigate('/login', { replace: true })
            } catch {
              toast.error('Could not log out all sessions')
            }
          }}
        >
          Log out all devices
        </Button>
      </div>
    </div>
  )
}
