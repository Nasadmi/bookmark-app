import * as z from 'zod'

export const loginSchema = z.strictObject({
  email: z.email().trim(),
  password: z
    .string()
    .trim()
    .min(8, "Password must have at leat 8 characters"),
})