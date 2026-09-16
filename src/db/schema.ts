import { text, timestamp } from "drizzle-orm/pg-core";
import { column, table } from "../utils";

export * from "./table/index"

export type TbUser = typeof TbUser;
export const TbUser = table("user", {
  id: column.text("id").primaryKey(),
  name: column.text("name").notNull(),
  email: column.text("email").notNull().unique(),
  emailVerified: column.boolean("email_verified").default(false),
  image: column.text("image"),
  role: column.text("role").notNull().default("user"),
  createdAt: column.createdAt(),
  updatedAt: column.updatedAt(),
});

export type TbSession = typeof TbSession;
export const TbSession = table("session", {
  id: column.id(),
  userId: text("user_id")
    .notNull()
    .references(() => TbUser.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: column.createdAt(),
  updatedAt: column.updatedAt(),
});
 
export type TbAccount = typeof TbAccount;
export const TbAccount = table("account", {
  id: column.id(),
  userId: text("user_id")
    .notNull()
    .references(() => TbUser.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(), // "credential" | "google" | "github" etc.
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),  
  password: text("password"), // only set for the "credential" provider
  createdAt: column.createdAt(),
  updatedAt: column.updatedAt(),
});
 
export type TbVerification = typeof TbVerification;
export const TbVerification = table("verification", {
  id: column.id(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: column.createdAt(),
  updatedAt: column.updatedAt(),
});

export const user = TbUser;
export const session = TbSession;
export const account = TbAccount;
export const verification = TbVerification;

// import { text, timestamp } from "drizzle-orm/pg-core";
// import { column, table } from "../utils";

// export * from "./table/index"

// export type TbUser = typeof TbUser;
// export const TbUser = table("user", {
//   id: column.text("id").primaryKey(),
//   name: column.text("name").notNull(),
//   email: column.text("email").notNull().unique(),
//   emailVerified: column.boolean("email_verified").default(false),
//   image: column.text("image"),
//   role: column.text("role").notNull().default("user"),
//   createdAt: column.createdAt,
//   updatedAt: column.updatedAt,
// });

// export type TbSession = typeof TbSession;
// export const TbSession = table("session", {
//   id: column.id,
//   userId: text("user_id")
//     .notNull()
//     .references(() => TbUser.id, { onDelete: "cascade" }),
//   token: text("token").notNull().unique(),
//   expiresAt: timestamp("expires_at").notNull(),
//   ipAddress: text("ip_address"),
//   userAgent: text("user_agent"),
//   createdAt: column.createdAt,
//   updatedAt: column.updatedAt,
// });
 
// export type TbAccount = typeof TbAccount;
// export const TbAccount = table("account", {
//   id: column.id,
//   userId: text("user_id")
//     .notNull()
//     .references(() => TbUser.id, { onDelete: "cascade" }),
//   accountId: text("account_id").notNull(),
//   providerId: text("provider_id").notNull(), // "credential" | "google" | "github" etc.
//   accessToken: text("access_token"),
//   refreshToken: text("refresh_token"),
//   idToken: text("id_token"),                                          // added
//   accessTokenExpiresAt: timestamp("access_token_expires_at"),         // added
//   refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),       // added
//   scope: text("scope"),  
//   password: text("password"), // only set for the "credential" provider
//   createdAt: column.createdAt,
//   updatedAt: column.updatedAt,
// });
 
// export type TbVerification = typeof TbVerification;
// export const TbVerification = table("verification", {
//   id: column.id(),
//   identifier: text("identifier").notNull(),
//   value: text("value").notNull(),
//   expiresAt: timestamp("expires_at").notNull(),
//   createdAt: column.createdAt(),
//   updatedAt: column.updatedAt(),
// });

// export const user = TbUser;
// export const session = TbSession;
// export const account = TbAccount;
// export const verification = TbVerification;