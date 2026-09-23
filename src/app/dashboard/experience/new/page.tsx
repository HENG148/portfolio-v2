import ExperienceForm from "@/src/features/experience/components/Experience-form";

export default function NewExperiencePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">New Experience</h1>
      <ExperienceForm />
    </div>
  );
}