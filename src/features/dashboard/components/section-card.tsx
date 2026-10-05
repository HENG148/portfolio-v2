import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DashboardSection } from "../type";

interface Props extends Omit<DashboardSection, "key"> {
  count?: number;
}

export function SectionCard({ label, description, href, icon: Icon, tile, count, soon }: Props) {
  const body = (
    <>
      <div className="flex gap-4">
        <span className={`grid size-11 shrink-0 place-items-center rounded-xl bg-linear-to-br text-white shadow-sm ${tile}`}>
          <Icon size={20} strokeWidth={1.9} />
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-[17px] font-semibold text-slate-900 dark:text-white">{label}</h2>
            {soon && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-white/10">
                soon
              </span>
            )}
          </div>
          <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{description}</p>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between pt-6">
        <span className="text-[13px] font-medium text-slate-500">
          {count !== undefined && `${count} ${count === 1 ? "item" : "items"}`}
        </span>
        <span className="grid size-8 place-items-center rounded-full bg-slate-50 text-slate-600 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:bg-white/5 dark:text-slate-400">
          <ArrowRight size={15} />
        </span>
      </div>
    </>
  );

  const base = "flex min-h-[152px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]";

  return soon ? (
    <div className={`${base} opacity-60`}>{body}</div>
  ) : (
    <Link href={href} className={`${base} group transition hover:-translate-y-0.5 hover:shadow-md`}>
      {body}
    </Link>
  );
}