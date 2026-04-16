import type { User } from '@/features/users/types'
import { cn } from '@/utils/cn'

type Props = {
  user: User
  className?: string
}

export function UserCard({ user, className }: Props) {
  return (
    <article
      className={cn(
        'rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900',
        className,
      )}
    >
      <p className="font-medium text-slate-900 dark:text-slate-100">{user.name}</p>
      <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
    </article>
  )
}
