import ConfirmDelete from "@/src/components/ui/confirm-delete";
import { db } from "@/src/db";
import { deleteEducationAction } from "@/src/features/education/action";
import { generateMetadata } from "@/src/lib/metadata";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "Education",
  description: "Manage education entries",
  path: "/dashboard/education",
})

export default async function EducationDashboardPage() {
  const items = await db.query.TbEducation.findMany({
    where: (e, { isNull }) => isNull(e.deletedAt),
    orderBy: (e, { asc }) => [asc(e.sortOrder)],
  });

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Education</h1>
        <Link
          href="/dashboard/education/new"
          className="bg-white text-black text-sm font-medium px-4 py-2 rounded-md">
          New Education
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((e) => (
          <div
            key={e.id}
            className="flex items-center justify-between border border-zinc-800 rounded-md p-3 hover:border-zinc-600"
          >
            <Link href={`/dashboard/education/${e.id}`} className="flex-1">
              <span className="text-sm text-white">{e.degree}</span>
              <span className="text-[12px] text-zinc-500 ml-2">@ {e.school}</span>
            </Link>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-[12px] text-zinc-500">{e.period}</span>
              <Link
                href={`/dashboard/education/${e.id}`}
                className="text-[13px] text-zinc-400 hover:text-white"
              >
                Edit
              </Link>
              <ConfirmDelete id={e.id} action={deleteEducationAction} />
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-zinc-500">No education entries yet.</p>}
      </div>
    </div>
  )
}