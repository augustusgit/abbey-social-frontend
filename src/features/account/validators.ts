import { z } from 'zod'

/** Mirrors backend `updateAccountSchema`. */
export const accountSettingsSchema = z.object({
  name: z
    .string()
    .trim()
    .max(80)
    .refine((s) => !s || s.length >= 2, 'Name must be at least 2 characters if set'),
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(32)
    .regex(/^[a-zA-Z0-9_.]+$/, 'Only letters, numbers, underscore and dot'),
  bio: z.string().trim().max(240).optional(),
  location: z.string().trim().max(120).optional(),
  website: z
    .string()
    .trim()
    .max(200)
    .optional()
    .refine((v) => !v || /^https?:\/\/.+/i.test(v), 'Enter a valid URL with http:// or https://'),
  birthday: z.string().optional(),
})

export type AccountSettingsFormValues = z.infer<typeof accountSettingsSchema>
