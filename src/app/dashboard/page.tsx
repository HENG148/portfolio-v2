import { generateMetadata } from "@/src/lib/metadata";
import { SectionCard } from "@/src/features/dashboard/components/section-card";
import { ActivityPanel } from "@/src/features/dashboard/components/activity-panel";
import { getCounts, getRecentActivity } from "@/src/features/dashboard/action/dashboard";
import { SECTIONS } from "@/src/features/dashboard/type";
import { QuickActions } from "@/src/features/dashboard/components/quick-action";

export const metadata = generateMetadata({
  title: "Dashboard",
  description: "dashboard",
  path: "/dashboard",
});

export default async function DashboardHomePage() {
  const [counts, activity] = await Promise.all([getCounts(), getRecentActivity()]);

  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">
        Manage your portfolio content and keep everything up to date.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {SECTIONS.map(({key, ...section}) => (
          <SectionCard key={key} {...section} count={counts[key]} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityPanel items={activity} />
        </div>
        <QuickActions />
      </div>
    </div>
  );
}