import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getHomeProjects } from "../action";
import ProjectCard from "./projectCard";

export async function FeaturedProjects() {
  const { projects, hasMore } = await getHomeProjects(6);
  if (projects.length === 0) return null;

  return (
    <section>
      <p className="mb-4 font-mono text-[13px] text-green-400/80">
        <span className="text-zinc-600">$</span> ls projects/
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-[#2a2a2a] px-5 py-2.5 text-[13px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            See all projects <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </section>
  );
}