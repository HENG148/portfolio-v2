import z from "zod";

export const bulletSchema = z.object({
  text: z.string().min(1),
});

export const experienceSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  period: z.string().min(1),
  bullets: z.array(bulletSchema).min(1),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export type ExperienceInsert = z.infer<typeof experienceSchema>;