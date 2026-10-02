import z from "zod";

export const skillCategorySchema = z.object({
  title: z.string().min(1),
  skills: z.array(z.string().min(1)).min(1),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
})

export type SkillCategoryInsert = z.infer<typeof skillCategorySchema>;