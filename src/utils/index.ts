import { boolean, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const column = {
  // id: text("id").primaryKey(),
  id: ()=>text("id").primaryKey().$defaultFn(()=> crypto.randomUUID()),
  serialId: serial("id").primaryKey(),

  text: (name: string) => text(name),
  varchar: (name: string, length = 225) => varchar(name, { length }),
  boolean: (name: string) => boolean(name),
  integer: (name: string) => integer(name),
  timestamp: (name: string) => timestamp(name),
  createdAt: () => timestamp("created_at").notNull().defaultNow(),
  updatedAt: () => timestamp("updated_at").notNull().defaultNow(),
}

export function table<T extends Record<string, unknown>>(name: string, columns: T) {
  return pgTable(name, columns as any);
}