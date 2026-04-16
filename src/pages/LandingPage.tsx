import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

const primaryLink = cn(
  'inline-flex min-w-[140px] items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
)

const secondaryLink = cn(
  'inline-flex min-w-[140px] items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
)

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Abbey Social
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Connect with people you care about. Register an account, build your profile, follow others,
          and grow your network — powered by a production-ready Express + Prisma API.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link to="/register" className={primaryLink}>
          Get started
        </Link>
        <Link to="/login" className={secondaryLink}>
          Sign in
        </Link>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Already have the backend running? Use the Vite dev proxy for <code className="font-mono">/api</code> or set{' '}
        <code className="font-mono">VITE_API_URL</code> for production builds.
      </p>
    </div>
  )
}
