'use client'

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Project } from "@/src/db/table";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { id, title, category, description, tags, imageUrl, status } = project;
  const isInProgress = status === "in-progress";
  const router = useRouter();

  return (
    <article className="group bg-[#111111] border border-[#222222] rounded-2xl overflow-hidden transition-all duration-200 hover:border-[#333333] hover:-translate-y-0.5">
      <div className="relative w-full h-48 bg-[#1a1a1a] overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-[#161616]" />
        )}

        {isInProgress && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-sm font-semibold tracking-wide border border-white/20 rounded-full px-4 py-1.5">
              In Progress
            </span>
          </div>
        )}
      </div>

      <div className="px-5 py-4 flex flex-col gap-3">
        {category && (
          <p className="text-[11px] font-semibold tracking-widest text-white/35 uppercase">
            {category}
          </p>
        )}
        <h3 className="text-[17px] font-bold text-white leading-snug">{title}</h3>
        <p className="text-[13px] text-white/50 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: string) => (
            <span
              key={tag}
              className="text-[12px] text-white/50 border border-[#2a2a2a] rounded-md px-2.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => router.push(`/projects/${id}`)}
          className="mt-2 self-start text-[13px] font-semibold text-white/80 border border-[#2a2a2a] rounded-lg px-4 py-2 hover:border-white/40 hover:text-white transition-colors"
        >
          View project →
        </button>
      </div>
    </article>
  );
}