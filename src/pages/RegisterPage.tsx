import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/common/Button'
import { registerFormSchema, type RegisterFormValues } from '@/features/auth/validators'
import { getErrorMessage } from '@/utils/apiError'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register: registerUser } = useAuth()
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { email: '', password: '', username: '', name: '' },
  })

  const onSubmit = async (values: RegisterFormValues) => {
    setFormError(null)
    const nameTrim = values.name?.trim()
    try {
      await registerUser({
        email: values.email.trim().toLowerCase(),
        password: values.password,
        username: values.username.trim().toLowerCase(),
        ...(nameTrim ? { name: nameTrim } : {}),
      })
      void navigate('/home', { replace: true })
    } catch (e) {
      setFormError(getErrorMessage(e, 'Could not register'))
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Create account</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Already registered?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Sign in
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950" noValidate>
        {formError && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200" role="alert">
            {formError}
          </p>
        )}
        <div className="space-y-1">
          <label htmlFor="reg-email" className="text-sm font-medium text-slate-800 dark:text-slate-200">
            Email
          </label>
          <input
            id="reg-email"
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
          <label htmlFor="reg-username" className="text-sm font-medium text-slate-800 dark:text-slate-200">
            Username
          </label>
          <input
            id="reg-username"
            autoComplete="username"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            {...register('username')}
          />
          {errors.username && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <label htmlFor="reg-name" className="text-sm font-medium text-slate-800 dark:text-slate-200">
            Display name <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input
            id="reg-name"
            autoComplete="name"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <label htmlFor="reg-password" className="text-sm font-medium text-slate-800 dark:text-slate-200">
            Password
          </label>
          <input
            id="reg-password"
            type="password"
            autoComplete="new-password"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
    </div>
  )
}
