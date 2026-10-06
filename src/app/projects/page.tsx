import { BreadCrumb } from "@/src/components/breadcrump";
import { getPublicProjects } from "@/src/features/projects/action";
import ProjectCard from "@/src/features/projects/components/projectCard";
import { generateMetadata } from "@/src/lib/metadata";

export const metadata = generateMetadata({
  title: "Projects",
  description: "All projects",
  path: "/projects",
});

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getPublicProjects();

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <BreadCrumb />

      <header className="mb-8 mt-6">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <p className="mt-1 font-mono text-[12px] text-zinc-600">{projects.length} total</p>
      </header>

      {projects.length === 0 ? (
        <p className="font-mono text-sm text-zinc-600">No projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}