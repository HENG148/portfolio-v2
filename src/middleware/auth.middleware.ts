import { headers } from "next/headers";
import { TbProject } from "../db/table";
import { auth } from "../lib/auth/auth"
import { db } from "../db";
import { eq } from "drizzle-orm"
import { AuthenticationError } from "../lib/error";

export type AuthContext = {
  user: NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>["user"];
  session: NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>["session"];
  profile: typeof TbProject.$inferSelect | null;
}

export function withAuthAction<Args extends unknown[], Return>(
  handler: (auth: AuthContext, ...args: Args) => Promise<Return>
) {
  return async (...args: Args): Promise<Return> => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      throw new AuthenticationError();
    }
    const profile = await db.query.TbProject.findFirst({
      where: (profileRow, { eq }) => eq(profileRow.userId, session.user.id),
    });
    return handler(
      { user: session.user, session: session.session, profile: profile ?? null },
      ...args
    )
  }
}