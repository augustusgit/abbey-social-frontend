import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/common/Button'
import { cn } from '@/utils/cn'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-md px-3 py-2 text-sm font-medium transition',
    isActive
      ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200'
      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
  )

export function Navbar() {
  const { user, isAuthenticated, isBootstrapping, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    void navigate('/login', { replace: true })
  }

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <NavLink to="/" className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Abbey Social
        </NavLink>
        <nav className="flex flex-wrap items-center gap-1">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          {!isBootstrapping && isAuthenticated && (
            <>
              <NavLink to="/home" className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/settings" className={linkClass}>
                Settings
              </NavLink>
              {user && (
                <NavLink to={`/profile/${user.id}`} className={linkClass}>
                  Profile
                </NavLink>
              )}
              <Button type="button" variant="ghost" className="ml-1" onClick={() => void handleLogout()}>
                Log out
              </Button>
            </>
          )}
          {!isBootstrapping && !isAuthenticated && (
            <>
              <NavLink to="/login" className={linkClass}>
                Sign in
              </NavLink>
              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
