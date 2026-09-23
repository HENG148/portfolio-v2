import Link from "next/link";
import { db } from "@/src/db";
import DeleteExperienceButton from "@/src/components/ui/delete-button";
// import { generateMetadata } from "@/src/lib/metadata";

// export const metadata = generateMetadata({
//   title: "Dashboard",
//   description: "dashboard",
//   path: "/dashboard",
// })

export default async function ExperiencePage() {
  const experiences = await db.query.TbExperience.findMany({
    where: (e, { isNull }) => isNull(e.deletedAt), // this line is used to remove the data after deleted it mean after delete it will move out of the page
    orderBy: (e, { asc }) => [asc(e.sortOrder)],
  });

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Experience</h1>
        <Link
          href="/dashboard/experience/new"
          className="bg-white text-black text-sm font-medium px-4 py-2 rounded-md"
        >
          New Experience
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {experiences.map((e) => (
          <div
            key={e.id}
            className="flex items-center justify-between border border-zinc-800 rounded-md p-3 hover:border-zinc-600"
          >
            <Link href={`/dashboard/experience/${e.id}`} className="flex-1">
              <span className="text-sm text-white">{e.title}</span>
              <span className="text-[12px] text-zinc-500 ml-2">@ {e.company}</span>
            </Link>

            <div className="flex items-center gap-4 shrink-0">
              <span className="text-[12px] text-zinc-500">{e.period}</span>
              <Link
                href={`/dashboard/experience/${e.id}`}
                className="text-[13px] text-zinc-400 hover:text-white transition-colors"
              >
                Edit
              </Link>
              <DeleteExperienceButton id={e.id} />
            </div>
          </div>
        ))}
        {experiences.length === 0 && (
          <p className="text-sm text-zinc-500">No experience entries yet.</p>
        )}
      </div>
    </div>
  );
}