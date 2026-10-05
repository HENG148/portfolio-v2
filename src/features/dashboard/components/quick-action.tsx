import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";
import { SECTIONS } from "../type";

export function QuickActions() {
  const actions = SECTIONS.filter((s) => s.quick);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/3">
      <h2 className="mb-3 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
        <Zap size={16} className="text-slate-500" /> Quick actions
      </h2>
      <div className="flex flex-col gap-2">
        {actions.map(({ key, icon: Icon, quick }) => (
          <Link
            key={key}
            href={quick!.href}
            className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2.5 text-sm font-medium text-slate-800 transition-colors hover:border-indigo-200 hover:bg-indigo-50/50 dark:border-white/5 dark:bg-white/2 dark:text-slate-200"
          >
            <Icon size={16} className="text-indigo-500" />
            <span className="flex-1">{quick!.label}</span>
            <ChevronRight size={15} className="text-slate-400" />
          </Link>
        ))}
      </div>
    </section>
  );
}