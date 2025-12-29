import { z } from 'zod'

const LinkSchema = z.strictObject({
  url: z.url().trim(),
  archived: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  last_visited: z.date().optional()
})

const UpdateLinkSchema = LinkSchema.partial()

export { LinkSchema, UpdateLinkSchema }