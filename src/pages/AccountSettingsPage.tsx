import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/common/Button'
import { fetchMyAccount, updateMyAccount } from '@/features/account/services/accountApi'
import { accountSettingsSchema, type AccountSettingsFormValues } from '@/features/account/validators'
import type { UpdateAccountPayload } from '@/types/account'
import { dateInputToIsoDatetime, isoToDateInput } from '@/utils/dateInput'
import { getErrorMessage } from '@/utils/apiError'

export default function AccountSettingsPage() {
  const queryClient = useQueryClient()
  const { replaceUser } = useAuth()

  const accountQuery = useQuery({
    queryKey: ['account', 'me'],
    queryFn: fetchMyAccount,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AccountSettingsFormValues>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      name: '',
      username: '',
      bio: '',
      location: '',
      website: '',
      birthday: '',
    },
  })

  useEffect(() => {
    const a = accountQuery.data
    if (!a) return
    reset({
      name: a.name ?? '',
      username: a.username,
      bio: a.bio ?? '',
      location: a.location ?? '',
      website: a.website ?? '',
      birthday: isoToDateInput(a.birthday),
    })
  }, [accountQuery.data, reset])

  const mutation = useMutation({
    mutationFn: updateMyAccount,
    onSuccess: (data) => {
      replaceUser({
        id: data.id,
        email: data.email,
        name: data.name,
        username: data.username,
      })
      void queryClient.invalidateQueries({ queryKey: ['account', 'me'] })
      void queryClient.invalidateQueries({ queryKey: ['account', 'public'] })
    },
  })

  const onSubmit = async (values: AccountSettingsFormValues) => {
    mutation.reset()
    const payload: UpdateAccountPayload = {
      name: values.name.trim() || undefined,
      username: values.username.trim().toLowerCase(),
      bio: values.bio?.trim() ? values.bio.trim() : null,
      location: values.location?.trim() ? values.location.trim() : null,
      website: values.website?.trim() ? values.website.trim() : null,
      birthday: dateInputToIsoDatetime(values.birthday ?? ''),
    }
    await mutation.mutateAsync(payload)
  }

  if (accountQuery.isPending) {
    return <p className="text-slate-600 dark:text-slate-400">Loading account…</p>
  }

  if (accountQuery.isError) {
    return (
      <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
        Could not load your account.
      </p>
    )
  }

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Account settings</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Updates are sent to <code className="font-mono">PUT /api/accounts/me</code>.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {mutation.isError && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200" role="alert">
            {getErrorMessage(mutation.error, 'Could not save')}
          </p>
        )}
        {mutation.isSuccess && !mutation.isPending && (
          <p className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-green-200" role="status">
            Profile saved.
          </p>
        )}

        <div className="space-y-1">
          <label htmlFor="acc-name" className="text-sm font-medium text-slate-800 dark:text-slate-200">
            Display name
          </label>
          <input
            id="acc-name"
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
          <label htmlFor="acc-username" className="text-sm font-medium text-slate-800 dark:text-slate-200">
            Username
          </label>
          <input
            id="acc-username"
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
          <label htmlFor="acc-bio" className="text-sm font-medium text-slate-800 dark:text-slate-200">
            Bio
          </label>
          <textarea
            id="acc-bio"
            rows={3}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            {...register('bio')}
          />
          {errors.bio && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.bio.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="acc-location" className="text-sm font-medium text-slate-800 dark:text-slate-200">
            Location
          </label>
          <input
            id="acc-location"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            {...register('location')}
          />
          {errors.location && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.location.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="acc-website" className="text-sm font-medium text-slate-800 dark:text-slate-200">
            Website
          </label>
          <input
            id="acc-website"
            type="url"
            placeholder="https://"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            {...register('website')}
          />
          {errors.website && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.website.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="acc-birthday" className="text-sm font-medium text-slate-800 dark:text-slate-200">
            Birthday
          </label>
          <input
            id="acc-birthday"
            type="date"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            {...register('birthday')}
          />
          {errors.birthday && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.birthday.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting || mutation.isPending}>
          {mutation.isPending || isSubmitting ? 'Saving…' : 'Save changes'}
        </Button>
      </form>
    </div>
  )
}
