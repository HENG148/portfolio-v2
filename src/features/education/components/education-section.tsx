import { db } from "@/src/db";
import EducationEntry from "./education-entry";

export default async function EducationSection() {
  const educations = await db.query.TbEducation.findMany({
    where: (e, { isNull }) => isNull(e.deletedAt),
    orderBy: (e, { asc }) => [asc(e.sortOrder)],
  });

  return (
    <section id="educations" className="w-full font-sans antialiased">
      <div className="mx-auto max-w-7xl py-20 px-6 md:px-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Education
          </h2>
        </div>

        {educations.length === 0 ? (
          <p className="text-[#444] text-sm">No education entries yet.</p>
        ) : (
          <div>
            {educations.map((edu, idx) => (
              <EducationEntry key={edu.id} edu={edu} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}