import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth/auth";

export async function requireSession() {
  const reqHeaders = await headers(); // outside try/catch

  let session = null;
  try {
    session = await auth.api.getSession({ headers: reqHeaders });
  } catch (e) {
    console.error("Session lookup failed:", e);
  }

  if (!session) redirect("/login");

  return session; 
}