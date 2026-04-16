import { cn } from '@/utils/cn'

type Props = {
  className?: string
}

export function PageSpinner({ className }: Props) {
  return (
    <div className={cn('flex min-h-[40vh] items-center justify-center', className)} role="status">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
    </div>
  )
}
