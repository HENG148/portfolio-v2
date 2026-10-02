import z from "zod";

export const projectSchema = z.object({
  title: z.string().min(1),
  category: z.string().optional(),
  description: z.string().min(1),
  summary: z
    .string()
    .trim()
    .max(200, "Keep the short intro under 200 characters")
    .optional()
    .transform((v) => (v ? v : undefined)),
  imageUrl: z.string().url().optional(),
  tags: z.array(z.string()).min(1),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
  status: z.enum(["completed", "in-progress"]).default("completed"),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
  
});

export type ProjectInsert = z.infer<typeof projectSchema>;