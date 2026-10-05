import { CalendarDays } from "lucide-react";

export function Topbar({ user }: { user: { name: string } }) {
  const date = new Date().toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

  return (
    <header className="flex h-16 items-center justify-between px-8">
      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
        <span className="mr-2">👋</span>Welcome back, {user.name}!
      </p>
      <div className="flex items-center gap-5 text-sm text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-2">
          <CalendarDays size={16} strokeWidth={1.8} />
          {date}
        </span>
        <span className="flex items-center gap-2 border-l border-slate-200 pl-5 dark:border-white/10">
          <span className="grid size-8 place-items-center rounded-full bg-slate-800 text-xs font-semibold text-white">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <span className="font-medium text-slate-800 dark:text-slate-200">{user.name}</span>
        </span>
      </div>
    </header>
  );
}