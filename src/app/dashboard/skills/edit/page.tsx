import { getSkillCategoryById } from "@/src/features/skills/action";
import SkillForm from "@/src/features/skills/components/skills-form";
import { notFound } from "next/navigation";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getSkillCategoryById(id);

  if (!category) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">Edit Skill Category</h1>
      <SkillForm initial={category} />
    </div>
  );
}