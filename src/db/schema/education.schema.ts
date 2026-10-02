import z from "zod";

export const educationSchema = z.object({
  school: z.string().min(1),
  degree: z.string().min(1),
  period: z.string().min(1),
  description: z.string().nullable().default(null),
  sortOrder: z.number().int().default(0),
});

export type EducationInsert = z.infer<typeof educationSchema>;