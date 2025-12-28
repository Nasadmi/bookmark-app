import { z } from "zod";

const UserSchema = z.strictObject({
  email: z.email().trim(),
  img: z.base64().optional(),
  password: z
    .string()
    .trim()
    .min(8, "Password must have at leat 8 character")
    .regex(/[A-Z]/, "Password must have at least 1 uppercase")
    .regex(/[a-z]/, "Password must have at least 1 lowercase")
    .regex(/[0-9]/, "Password must have at least 1 number"),
});

const UpdateUserSchema = UserSchema.partial();

export { UpdateUserSchema, UserSchema };
