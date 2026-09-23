import Link from "next/link";
import {
  User,
  FolderKanban,
  GraduationCap,
  Briefcase,
  Wrench,
  Newspaper,
  Mail,
} from "lucide-react";
import { generateMetadata } from "@/src/lib/metadata";

interface DashboardCard {
  label: string;
  description: string;
  href: string;
  icon: React.ElementType;
  ready: boolean;
}

const cards: DashboardCard[] = [
  {
    label: "About",
    description: "Bio, highlights, tags, and photos",
    href: "/dashboard/about",
    icon: User,
    ready: true,
  },
  {
    label: "Projects",
    description: "Portfolio projects — create, edit, reorder",
    href: "/dashboard/projects",
    icon: FolderKanban,
    ready: true,
  },
  {
    label: "Experience",
    description: "Work history and roles",
    href: "/dashboard/experience",
    icon: Briefcase,
    ready: true,
  },
  {
    label: "Education",
    description: "Degrees, schools, certifications",
    href: "/dashboard/education",
    icon: GraduationCap,
    ready: false,
  },
  {
    label: "Skills",
    description: "Tech stack and proficiencies",
    href: "/dashboard/skills",
    icon: Wrench,
    ready: false,
  },
  {
    label: "Blog",
    description: "Posts and articles",
    href: "/dashboard/blog",
    icon: Newspaper,
    ready: false,
  },
  {
    label: "Contact",
    description: "Contact info and social links",
    href: "/dashboard/contact",
    icon: Mail,
    ready: false,
  },
];

export const metadata = generateMetadata({
  title: "Dashboard",
  description: "dashboard",
  path: "/dashboard",
})

export default function DashboardHomePage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <p className="font-mono text-[13px] text-green-400/80 mb-1">
          <span className="text-zinc-600">$</span> ls sections/
        </p>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ label, description, href, icon: Icon, ready }) =>
          ready ? (
            <Link
              key={label}
              href={href}
              className="group rounded-lg border border-zinc-800 bg-[#0d0d0d] p-5 flex flex-col gap-3 hover:border-zinc-600 transition-colors"
            >
              <Icon size={20} className="text-zinc-400 group-hover:text-white transition-colors" strokeWidth={1.8} />
              <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-[13px] text-zinc-500 mt-0.5">{description}</p>
              </div>
            </Link>
          ) : (
            <div
              key={label}
              className="rounded-lg border border-zinc-800/60 bg-[#0d0d0d]/50 p-5 flex flex-col gap-3 opacity-50 cursor-not-allowed"
            >
              <Icon size={20} className="text-zinc-600" strokeWidth={1.8} />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-zinc-400">{label}</p>
                  <span className="text-[10px] font-mono text-zinc-600 border border-zinc-800 rounded px-1.5 py-0.5">
                    soon
                  </span>
                </div>
                <p className="text-[13px] text-zinc-600 mt-0.5">{description}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}