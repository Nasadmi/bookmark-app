import * as z from 'zod'

export const registerSchema = z.strictObject({
  email: z.email().trim(),
  password: z
    .string()
    .trim()
    .min(8, "Password must have at leat 8 character")
    .regex(/[A-Z]/, "Password must have at least 1 uppercase")
    .regex(/[a-z]/, "Password must have at least 1 lowercase")
    .regex(/[0-9]/, "Password must have at least 1 number"),
});