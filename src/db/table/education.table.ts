import { column, table } from "@/src/utils";
import { integer, text, timestamp } from "drizzle-orm/pg-core";

export const TbEducation = table("education", {
  id: column.id(),
  school: column.text("school").notNull(),
  degree: column.text("degree").notNull(),
  period: column.text("period").notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").notNull().default(0),
  deletedAt: timestamp("deleted_at"),
  createdAt: column.createdAt(),
  updatedAt: column.updatedAt(),
})

export type Education = typeof TbEducation.$inferSelect;