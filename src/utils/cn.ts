/** Join class names; extend with clsx + tailwind-merge when class lists grow. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
