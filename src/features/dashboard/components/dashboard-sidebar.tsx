"use client"

import { Box, Home } from "lucide-react";
import { SECTIONS } from "../type";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NAV = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home
  },
  ...SECTIONS.map(({ label, href, icon }) => ({ label, href, icon }))
];

export function DashboardSidebar({ user }: { user: { name: string } }) {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-3 py-5 dark:border-white/10 dark:bg-[#0e0e13] md:flex">
      <div className="mb-6 flex items-center gap-2 px-3">
        <Box className="size-6 text-indigo-500" strokeWidth={2.2} />
        <span className="font-semibold text-slate-900 dark:text-white">Portfolio CMS</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/5"
              }`}
            >
              <Icon size={18} strokeWidth={1.8} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3 border-t border-slate-100 px-3 pt-4 dark:border-white/10">
        <span className="grid size-8 place-items-center rounded-full bg-slate-800 text-xs font-semibold text-white">
          {user.name.charAt(0).toUpperCase()}
        </span>
        <span className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">{user.name}</span>
      </div>
    </aside>
  );
}