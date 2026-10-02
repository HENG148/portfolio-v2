import { column, table } from "@/src/utils";
import { jsonb, timestamp } from "drizzle-orm/pg-core";

export type TbSkillCategory = typeof TbSkillCategory;
export const TbSkillCategory = table("skills_category", {
  id: column.id(),
  title: column.text("title").notNull(),
  skills: jsonb("skills").$type<string[]>().notNull().default([]),
  sortOrder: column.integer("sort_order").notNull().default(0),
  isActive: column.boolean("is_active").notNull().default(true),
  deletedAt: timestamp("deleted_at"),
  createdAt: column.createdAt(),
  updatedAt: column.updatedAt(),
})

export type SkillCategoryRow = typeof TbSkillCategory.$inferSelect;
export type NewSkillCategoryRow = typeof TbSkillCategory.$inferInsert;