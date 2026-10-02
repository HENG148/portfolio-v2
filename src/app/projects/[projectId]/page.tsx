import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { NotFoundError } from "@/src/lib/error";
import { getProjectDetail } from "@/src/features/projects/action";
import MarkdownContent from "@/src/components/markdown-content";

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
    <section className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/#project"
          className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to projects
        </Link>

        <p className="mb-2 mt-6 text-[12px] text-muted-foreground">
          Project {number} of {total}
        </p>

        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold leading-snug text-foreground">{title}</h1>
          {isInProgress && (
            <span className="shrink-0 rounded-full border border-border px-3 py-1 text-xs font-semibold tracking-wide text-muted-foreground">
              In Progress
            </span>
          )}
        </div>

        {category && (
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {category}
          </p>
        )}

        <div className="relative mb-8 h-80 w-full overflow-hidden rounded-2xl bg-muted">
          {imageUrl ? (
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          ) : (
            <div className="h-full w-full bg-muted" />
          )}
        </div>

        <div className="mb-8">
          <MarkdownContent content={description} />
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {(tags ?? []).map((tag: string) => (
            <span
              key={tag}
              className="rounded-md border border-border px-2.5 py-0.5 text-[12px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mb-16 flex items-center gap-3">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-4 py-2 text-[13px] font-medium text-muted-foreground transition-all hover:border-ring hover:text-foreground"
            >
              GitHub
            </Link>
          )}
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-4 py-2 text-[13px] font-medium text-muted-foreground transition-all hover:border-ring hover:text-foreground"
            >
              Live Site
            </Link>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-6">
          {prev ? (
            <Link
              href={`/projects/${prev.id}`}
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.id}`}
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </section>
  );
}