import { headers } from "next/headers";
import { auth } from "../lib/auth/auth";
import { AuthenticationError } from "../lib/error";

export type AuthContext = {
  user: NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>["user"];
  session: NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>["session"];
};

export function withAuthAction<Args extends unknown[], Return>(
  handler: (auth: AuthContext, ...args: Args) => Promise<Return>
) {
  return async (...args: Args): Promise<Return> => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      throw new AuthenticationError();
    }
    return handler({ user: session.user, session: session.session }, ...args);
  };
}