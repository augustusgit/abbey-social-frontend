import { z } from 'zod'

/** Mirrors backend `registerSchema` for client-side validation. */
export const registerFormSchema = z.object({
  email: z.string().trim().email('Enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be 64 characters or fewer'),
  name: z
    .string()
    .trim()
    .max(80)
    .refine((s) => s.length === 0 || s.length >= 2, 'Name must be at least 2 characters if provided'),
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(32, 'Username must be 32 characters or fewer')
    .regex(/^[a-zA-Z0-9_.]+$/, 'Only letters, numbers, underscore and dot'),
})

export const loginFormSchema = z.object({
  email: z.string().trim().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

export type RegisterFormValues = z.infer<typeof registerFormSchema>
export type LoginFormValues = z.infer<typeof loginFormSchema>
