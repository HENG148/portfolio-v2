import { getProjectById } from "@/src/features/projects/action";
import ProjectForm from "@/src/features/projects/components/project-form";
import { notFound } from "next/navigation";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">Edit Project</h1>
      <ProjectForm initial={project} />
    </div>
  );
}