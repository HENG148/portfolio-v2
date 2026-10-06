import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/src/db/table";

interface ProjectCardProps {
  project: Project;
}

function makeSummary(md: string, max = 140) {
  const plain = md
    .replace(/[*_`#>]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= max) return plain;
  return plain.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { id, title, category, summary, description, tags, imageUrl, status } = project;
  const isInProgress = status === "in-progress";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#222222] bg-[#111111] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#333333]">
      <div className="relative h-48 w-full overflow-hidden bg-[#1a1a1a]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-[#161616]" />
        )}

        {isInProgress && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-semibold tracking-wide text-white">
              In Progress
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 py-4">
        {category && (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/35">
            {category}
          </p>
        )}
        <h3 className="text-[17px] font-bold leading-snug text-white">{title}</h3>

        <p className="line-clamp-3 text-[13px] leading-relaxed text-white/50">
          {summary?.trim() || makeSummary(description)}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-md border border-[#2a2a2a] px-2.5 py-0.5 text-[12px] text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${id}`}
          className="mt-auto self-start rounded-lg border border-[#2a2a2a] px-4 py-2 text-[13px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
        >
          View more details →
        </Link>
      </div>
    </article>
  );
}