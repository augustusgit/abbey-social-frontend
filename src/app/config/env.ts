/**
 * Resolved API origin for Axios. Empty string means same-origin (use the Vite dev proxy for `/api/*`).
 */
export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_URL
  if (!raw) return ''
  return raw.replace(/\/$/, '')
}
