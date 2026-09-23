import { Bullet } from "@/src/features/experience/type";
import { column, table } from "@/src/utils";
import { jsonb, timestamp } from "drizzle-orm/pg-core";

export type TbExperience = typeof TbExperience;
export const TbExperience = table("experience", {
  id: column.id(),
  title: column.text("title").notNull(),
  company: column.text("company").notNull(),
  period: column.text("period").notNull(),
  bullets: jsonb("bullets").$type<Bullet[]>().notNull().default([]),
  sortOrder: column.integer("sort_order").notNull().default(0),
  isActive: column.boolean("is_active").notNull().default(true),
  deletedAt: timestamp("deleted_at"),
  createdAt: column.createdAt(),
  updatedAt: column.updatedAt(),
})

export type ExperienceRow = typeof TbExperience.$inferSelect;
export type NewExperienceRow = typeof TbExperience.$inferInsert;