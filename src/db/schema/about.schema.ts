import z from "zod";

export const highlightSchema = z.object({
  text: z.string().min(1),
});

export const tagSchema = z.object({
  label: z.string().min(1),
});

export const slideSchema = z.object({
  src: z.string().min(1),
  alt: z.string().default(""),
  publicId: z.string().min(1),
});

export const aboutSchema = z.object({
  bio: z.string().min(1),
  highlights: z.array(highlightSchema).default([]),
  tags: z.array(tagSchema).default([]),
  slides: z.array(slideSchema).default([]),
});

export type AboutInsert = z.infer<typeof aboutSchema>;