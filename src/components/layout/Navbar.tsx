import { NavLink } from 'react-router-dom'
import { cn } from '@/utils/cn'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-md px-3 py-2 text-sm font-medium transition',
    isActive
      ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200'
      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
  )

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <NavLink to="/" className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Abbey Social
        </NavLink>
        <nav className="flex gap-1">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
