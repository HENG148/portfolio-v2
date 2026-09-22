import { Slide, Tag, Highlight } from "@/src/features/about/type";
import { column, table } from "@/src/utils";
import { jsonb, text } from "drizzle-orm/pg-core";

export type TbAbout = typeof TbAbout;
export const TbAbout = table("about", {
  id: column.id(),
  // profileId: text("profile_id").notNull().unique(),
  bio: column.text("bio").notNull(),
  highlights: jsonb("highlights").$type<Highlight[]>().notNull().default([]),
  tags: jsonb("tags").$type<Tag[]>().notNull().default([]),
  slides: jsonb("slides").$type<Slide[]>().notNull().default([]),
  createdAt: column.createdAt(),
  updatedAt: column.updatedAt(),
});

export type About = typeof TbAbout.$inferSelect;
export type NewAbout = typeof TbAbout.$inferInsert;