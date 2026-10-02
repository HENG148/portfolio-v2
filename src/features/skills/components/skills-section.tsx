import { getSkillCategories } from "../action";
import SkillCard from "./skills-card";

export default async function SkillSection() {
  const skillCategories = await getSkillCategories();

  return (
    <section
      id="skills"
      className="w-full font-sans bg-[#0d0d0d] flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Skills</h2>
          <p className="text-[#888] text-base tracking-wide">
            Tools and technologies I use to build products.
          </p>
        </div>

        {skillCategories.length === 0 ? (
          <p className="text-center text-sm text-neutral-500">No skills added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl">
            {skillCategories.map((cate) => (
              <SkillCard key={cate.title} category={cate} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}