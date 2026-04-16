import type { AxiosError } from 'axios'

type ErrorBody = {
  message?: string
}

export function getErrorMessage(error: unknown, fallback = 'Something went wrong'): string {
  const ax = error as AxiosError<ErrorBody>
  const msg = ax.response?.data?.message
  if (typeof msg === 'string' && msg.trim()) return msg
  if (error instanceof Error && error.message) return error.message
  return fallback
}
