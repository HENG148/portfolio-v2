import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/src/db/schema"
import { db } from "@/src/db";

const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL,
  trustedOrigins: [
    baseURL,
    process.env.NEXT_PUBLIC_APP_URL,
    // process.env.BETTER_AUTH_URL!,
    "http://localhost:3000",
    // "http://127.0.0.1:3000"
  ].filter((o): o is string => Boolean(o)),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    }
  }
})