// src/features/dashboard/components/activity-panel.tsx
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { ActivityItem } from "../action/dashboard";

export function ActivityPanel({ items }: { items: ActivityItem[] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/3">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
          <Clock size={16} className="text-slate-500" /> Recent activity
        </h2>
        <Link href="/dashboard" className="flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600">
          View all <ArrowRight size={12} />
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400">No activity yet.</p>
      ) : (
        <ul className="divide-y divide-slate-100 dark:divide-white/5">
          {items.map(({ id, title, detail, time, status, icon: Icon }) => (
            <li key={id} className="flex items-center gap-4 py-3">
              <span className="grid size-9 place-items-center rounded-lg bg-slate-50 text-slate-500 dark:bg-white/5">
                <Icon size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{title}</p>
                <p className="truncate text-xs text-slate-400">{detail}</p>
              </div>
              <span className="text-xs text-slate-400">{time}</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                  status === "Created"
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"
                    : "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300"
                }`}
              >
                {status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}