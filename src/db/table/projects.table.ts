import { column, table } from "@/src/utils";
import { text, timestamp } from "drizzle-orm/pg-core";

export type TbProject = typeof TbProject;
export const TbProject = table("project", {
  id: column.id(),
  title: column.text("title").notNull(),
  category: column.text("category"),
  description: column.text("description").notNull(),
  imageUrl: column.text("image_url"),
  tags: text("tags").array().notNull().default([]),
  githubUrl: column.text("github_url"),
  liveUrl: column.text("live_url"),
  featured: column.boolean("featured").notNull().default(false),
  status: column.text("status").notNull().default("completed"), // "completed" | "in-progress"
  sortOrder: column.integer("sort_order").notNull().default(0),
  isActive: column.boolean("is_active").notNull().default(true),
  deletedAt: timestamp("deleted_at"),
  createdAt: column.createdAt(),
  updatedAt: column.updatedAt(),
})

export type Project = typeof TbProject.$inferSelect;
export type NewProject = typeof TbProject.$inferInsert