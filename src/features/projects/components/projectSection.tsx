import { getFeaturedProjects } from "../action";
import ProjectCard from "./projectCard";

export default async function ProjectsSection() {
  const projects = await getFeaturedProjects();

  return (
    <section id="projects" className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold text-white mb-2 text-center">
        Featured Project
      </h2>
      <p className="text-white/40 text-center mb-12 text-sm">
        A selection of work focused on performance, UX and clean code.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p className="text-white/40 text-center col-span-full">
            No projects found
          </p>
        )}
      </div>
    </section>
  );
}