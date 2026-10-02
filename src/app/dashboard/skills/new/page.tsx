import SkillForm from "@/src/features/skills/components/skills-form";

export default function NewSkillPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">New Skill Category</h1>
      <SkillForm />
    </div>
  );
}