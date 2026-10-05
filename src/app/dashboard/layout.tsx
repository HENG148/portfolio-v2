// import { auth } from "@/src/lib/auth/auth";
// import { headers } from "next/headers";
// import Link from "next/link";
// import { redirect } from "next/navigation";

// export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const reqHeader = await headers();
//   let session;
//   try {
//     session = await auth.api.getSession({ headers: reqHeader });
//   } catch (e) {
//     console.error("Session lookup failed:", e);
//     redirect("/login");
//   }
//   if (!session) {
//     redirect("/login");
//   }

//   return (
//     <div className="min-h-screen bg-[#0a0a0a] text-zinc-300">
//       <div className="flex">
//         <aside className="w-56 shrink-0 border-r border-zinc-800 min-h-screen p-4">
//           <p className="text-[13px] font-mono text-zinc-500 mb-6">dashboard/</p>
//           <nav className="flex flex-col gap-1">
//             <Link href="/dashboard/about" className="text-sm px-2 py-1.5 rounded hover:bg-zinc-900">
//               About
//             </Link>
//             <Link href="/dashboard/experience" className="text-sm px-2 py-1.5 rounded hover:bg-zinc-900">
//               Experience
//             </Link>
//             <Link href="/dashboard/projects" className="text-sm px-2 py-1.5 rounded hover:bg-zinc-900">
//               Projects
//             </Link>
//           </nav>
//         </aside>
//         <main className="flex-1 p-8">{children}</main>
//       </div>
//     </div>
//   )
// }

import { DashboardSidebar } from "@/src/features/dashboard/components/dashboard-sidebar";
import { Topbar } from "@/src/features/dashboard/components/dashboard-topbar";
import { requireSession } from "@/src/lib/require-session";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireSession();

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0b0b0f] dark:text-slate-100">
      <DashboardSidebar user={user} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar user={user} />
        <main className="flex-1 px-8 pb-10">{children}</main>
      </div>
    </div>
  );
}