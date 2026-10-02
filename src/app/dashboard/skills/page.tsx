import Link from "next/link";
import { db } from "@/src/db";
import DeleteButton from "@/src/components/ui/delete";
import { deleteProjectAction } from "@/src/features/projects/action";
import { deleteSkillCategoryAction } from "@/src/features/skills/action";
// import DeleteSkillButton from "@/src/components/ui/delete-skill";

export default async function DashboardSkillPage() {
  const categories = await db.query.TbSkillCategory.findMany({
    where: (s, { isNull }) => isNull(s.deletedAt),
    orderBy: (s, { asc }) => [asc(s.sortOrder), asc(s.createdAt)],
  });

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Skills</h1>
        <Link
          href="/dashboard/skills/new"
          className="bg-white text-black text-sm font-medium px-4 py-2 rounded-md"
        >
          New Category
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {categories.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between border border-zinc-800 rounded-md p-3 hover:border-zinc-600"
          >
            <Link href={`/dashboard/skills/${c.id}`} className="flex-1 min-w-0">
              <span className="text-sm text-white">{c.title}</span>
              <span className="text-[12px] text-zinc-500 ml-2 truncate">
                {c.skills.join(", ")}
              </span>
            </Link>

            <div className="flex items-center gap-4 shrink-0 ml-4">
              <Link
                href={`/dashboard/skills/${c.id}`}
                className="text-[13px] text-zinc-400 hover:text-white transition-colors"
              >
                Edit
              </Link>
              <DeleteButton
                id={c.id}
                action={deleteSkillCategoryAction}
                confirmMessage="Delete this skill category?"
              />
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <p className="text-sm text-zinc-500">No skill categories yet.</p>
        )}
      </div>
    </div>
  );
}