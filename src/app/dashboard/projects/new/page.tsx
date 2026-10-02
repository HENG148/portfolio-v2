import ProjectForm from "@/src/features/projects/components/project-form";

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">New Project</h1>
      <ProjectForm />
    </div>
  );
}