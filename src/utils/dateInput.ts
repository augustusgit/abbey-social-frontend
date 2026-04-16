/** Convert API ISO datetime to `YYYY-MM-DD` for a date input field. */
export function isoToDateInput(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toISOString().slice(0, 10)
}

/** Convert date input value to ISO string for `birthday` (backend expects datetime string). */
export function dateInputToIsoDatetime(value: string): string | null {
  const t = value.trim()
  if (!t) return null
  return new Date(`${t}T12:00:00.000Z`).toISOString()
}
