import { column, table } from "@/src/utils";
import { integer, text } from "drizzle-orm/pg-core";

export const TbMedia = table("media", {
  id: column.id(),
  url: column.text("url").notNull(),
  publicId: column.text("public_id").notNull().unique(),
  alt: column.text("alt"),
  width: integer("width"),
  height: integer("height"),
  bytes: integer("bytes"),
  format: text("format"),
  createdAt: column.createdAt(),
})

export type Media = typeof TbMedia.$inferSelect;
export type NewMedia = typeof TbMedia.$inferInsert;