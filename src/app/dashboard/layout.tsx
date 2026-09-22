import { auth } from "@/src/lib/auth/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300">
      <div className="flex">
        <aside className="w-56 shrink-0 border-r border-zinc-800 min-h-screen p-4">
          <p className="text-[13px] font-mono text-zinc-500 mb-6">dashboard/</p>
          <nav className="flex flex-col gap-1">
            <Link href="/dashboard/about" className="text-sm px-2 py-1.5 rounded hover:bg-zinc-900">
              About
            </Link>
            <Link href="/dashboard/projects" className="text-sm px-2 py-1.5 rounded hover:bg-zinc-900">
              Projects
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}