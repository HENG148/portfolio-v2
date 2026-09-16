  import Link from "next/link";
  import Image from "next/image";
  import { notFound } from "next/navigation";
  import { NotFoundError } from "@/src/lib/error";
  import { getProjectDetail } from "@/src/features/projects/action";

  interface ProjectDetailPageProps {
    params: Promise<{ projectId: string }>;
  }

  export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    const { projectId } = await params;

    let project;
    try {
      project = await getProjectDetail(projectId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        notFound();
      }
      throw error;
    }

    const {
      title,
      category,
      description,
      tags,
      githubUrl,
      liveUrl,
      imageUrl,
      status,
      number,
      total,
      prev,
      next,
    } = project;

    const isInProgress = status === "in-progress";

    return (
      <section className="max-w-4xl mx-auto py-16 px-6">
        <Link
          href="/#project"
          className="text-[13px] text-white/40 hover:text-white/70 transition-colors"
        >
          ← Back to projects
        </Link>

        <p className="text-[12px] text-white/30 mt-6 mb-2">
          Project {number} of {total}
        </p>

        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-white leading-snug">{title}</h1>
          {isInProgress && (
            <span className="shrink-0 text-xs font-semibold tracking-wide border border-white/20 rounded-full px-3 py-1 text-white/70">
              In Progress
            </span>
          )}
        </div>

        {category && (
          <p className="text-[11px] font-semibold tracking-widest text-white/35 uppercase mb-6">
            {category}
          </p>
        )}

        <div className="relative w-full h-80 bg-[#1a1a1a] rounded-2xl overflow-hidden mb-8">
          {imageUrl ? (
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-[#161616]" />
          )}
        </div>

        <p className="text-white/60 leading-relaxed mb-8">{description}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {(tags ?? []).map((tag: any) => (
            <span
              key={tag}
              className="text-[12px] text-white/50 border border-[#2a2a2a] rounded-md px-2.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-16">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-white/60 border border-[#2a2a2a] rounded-lg px-4 py-2 transition-all hover:text-white hover:border-[#444444]"
            >
              GitHub
            </Link>
          )}
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-white/60 border border-[#2a2a2a] rounded-lg px-4 py-2 transition-all hover:text-white hover:border-[#444444]"
            >
              Live Site
            </Link>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[#222222] pt-6">
          {prev ? (
            <Link
              href={`/projects/${prev.id}`}
              className="text-[13px] text-white/40 hover:text-white/70 transition-colors"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.id}`}
              className="text-[13px] text-white/40 hover:text-white/70 transition-colors"
            >
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </section>
    );
  }