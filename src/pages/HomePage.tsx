import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/common/Button'
import { UserCard } from '@/features/users/components/UserCard'
import { useUsers } from '@/features/users/hooks/useUsers'

const contactSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  message: z.string().min(5, 'Message should be at least 5 characters'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function HomePage() {
  const { data: users, isPending, isError, error } = useUsers()
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { email: '', message: '' },
  })

  const onSubmit: SubmitHandler<ContactFormValues> = () => {
    setSubmitted(true)
    reset()
  }

  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Welcome
        </h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400">
          This app uses Vite, React Query, React Router, Axios, React Hook Form, and Zod. Point{' '}
          <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-800">VITE_API_URL</code>{' '}
          at your Express server or leave it empty in development to use the Vite <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-800">/api</code>{' '}
          proxy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100">Users (sample query)</h2>
        {isPending && <p className="text-slate-600 dark:text-slate-400">Loading users…</p>}
        {isError && (
          <p className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
            Could not load users — ensure your Express API exposes <code className="font-mono">GET /api/users</code>
            {error instanceof Error ? `: ${error.message}` : '.'}
          </p>
        )}
        {users && users.length > 0 && (
          <ul className="grid gap-3 sm:grid-cols-2">
            {users.map((user) => (
              <li key={user.id}>
                <UserCard user={user} />
              </li>
            ))}
          </ul>
        )}
        {users && users.length === 0 && (
          <p className="text-slate-600 dark:text-slate-400">No users returned.</p>
        )}
      </section>

      <section className="max-w-md space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950">
        <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100">Contact (React Hook Form + Zod)</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="message" className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Message
            </label>
            <textarea
              id="message"
              rows={3}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
              {...register('message')}
            />
            {errors.message && (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.message.message}
              </p>
            )}
          </div>
          <Button type="submit">Send</Button>
          {submitted && (
            <p className="text-sm text-green-700 dark:text-green-400" role="status">
              Form validates — wire this submit handler to your Express route when ready.
            </p>
          )}
        </form>
      </section>
    </div>
  )
}
