import { TagList } from "@/src/components/tag-list";
import { CTA, CTAButton } from "@/src/components/ui/cta-button";

interface HeroProps {
  title: React.ReactNode;
  description: string;
  tags: readonly string[];
  actions: CTA[];
}

export default function HeroContents({ title, description, tags, actions }: HeroProps) {
  return (
    <div className="flex flex-1 flex-col w-full gap-7">
      <h1 className="font-primary text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.06] tracking-tight text-white">
        {title}
      </h1>
      <p className="text-neutral-400 text-base leading-relaxed max-w-md">
        {description}
      </p>
      <TagList tags={tags} />
      <CTAButton actions={actions} />
    </div>
  )
}