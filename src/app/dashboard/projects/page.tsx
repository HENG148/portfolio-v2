// import DeleteProjectButton from "@/src/components/ui/delete-project";
import DeleteButton from "@/src/components/ui/delete";
import { deleteProjectAction, getProjects } from "@/src/features/projects/action";
import Link from "next/link";

export default async function DashboardProjectsPage() {
  const projects = await getProjects();
  const visible = projects.filter((p) => !p.deletedAt);

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <Link
          href="/dashboard/projects/new"
          className="bg-white text-black text-sm font-medium px-4 py-2 rounded-md"
        >
          New Project
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {visible.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between border border-zinc-800 rounded-md p-3 hover:border-zinc-600"
          >
            <Link href={`/dashboard/projects/${p.id}`} className="flex-1 min-w-0">
              <span className="text-sm text-white">{p.title}</span>
              {p.featured && (
                <span className="ml-2 text-[10px] font-mono text-zinc-500 border border-zinc-800 rounded px-1.5 py-0.5">
                  featured
                </span>
              )}
            </Link>

            <div className="flex items-center gap-4 shrink-0 ml-4">
              <span className="text-[12px] text-zinc-500">{p.status}</span>
              <Link
                href={`/dashboard/projects/${p.id}`}
                className="text-[13px] text-zinc-400 hover:text-white transition-colors"
              >
                Edit
              </Link>
              {/* <DeleteProjectButton id={p.id} /> */}
              <DeleteButton
                id={p.id}
                action={deleteProjectAction}
                confirmMessage="Delete this project sections?"
              />
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <p className="text-sm text-zinc-500">No projects yet.</p>
        )}
      </div>
    </div>
  );
}