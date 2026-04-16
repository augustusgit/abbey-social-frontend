import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/common/Button'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-4 text-center">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Page not found</h1>
      <p className="text-slate-600 dark:text-slate-400">The page you requested does not exist.</p>
      <Button type="button" onClick={() => navigate('/')}>
        Back home
      </Button>
    </div>
  )
}
