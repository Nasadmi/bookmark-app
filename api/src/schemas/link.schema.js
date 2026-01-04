import { z } from "zod";

const LinkSchema = z.strictObject({
  url: z.url().trim(),
  archived: z.boolean().optional(),
  tags: z
    .array(z.string())
    .refine((items) => new Set(items).size === items.length, {
      message: "Repeated tag",
    })
    .optional(),
  last_visited: z.date().optional(),
  title: z.string().trim().max(255).optional(),
  description: z.string().trim().max(1000).optional(),
  favicon: z.url().trim().optional(),
});

const UpdateLinkSchema = LinkSchema.partial();

export { LinkSchema, UpdateLinkSchema };
