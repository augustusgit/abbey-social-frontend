import { useContext } from 'react'
import { ToastContext, type ToastApi } from '@/app/providers/toast-context'

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return ctx
}
