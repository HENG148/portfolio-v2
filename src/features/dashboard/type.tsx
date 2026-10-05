import type { ElementType } from "react";
import {
  User, FolderKanban, GraduationCap, Briefcase, Wrench, FileText, Mail,
} from "lucide-react";

export interface DashboardSection {
  key: string;
  label: string;
  description: string;
  href: string;
  icon: ElementType;
  tile?: string;
  quick?: { label: string; href: string };
  soon?: boolean;
}

export const SECTIONS: DashboardSection[] = [
  {
    key: "about",
    label: "About",
    icon: User,
    href: "/dashboard/about",
    description: "Bio, highlights, tags and photos",
    tile: "from-indigo-500 to-violet-500"
  },
  {
    key: "projects",
    label: "Projects",
    icon: FolderKanban,
    href: "/dashboard/projects",
    description: "Portfolio projects — create, edit, reorder",
    tile: "from-emerald-500 to-teal-400",
    quick: {
      label: "Add new project",
      href: "/dashboard/projects/new"
    }
  },
  {
    key: "experience",
    label: "Experience",
    icon: Briefcase, href: "/dashboard/experience",
    description: "Work history and roles",
    tile: "from-orange-400 to-amber-400",
    quick: {
      label: "Update experience",
      href: "/dashboard/experience/new"
    }
  },
  {
    key: "education",
    label: "Education",
    icon: GraduationCap,
    href: "/dashboard/education",
    description: "Degrees, schools, certifications",
    tile: "from-pink-500 to-rose-400"
  },
  {
    key: "skills",
    label: "Skills",
    icon: Wrench,
    href: "/dashboard/skills",
    description: "Tech stack and proficiencies",
    tile: "from-blue-500 to-sky-400",
    quick: {
      label: "Edit skills",
      href: "/dashboard/skills/new"
    }
  },
  {
    key: "blog",
    label: "Blog",
    icon: FileText,
    href: "/dashboard/blog",
    description: "Posts and articles",
    tile: "from-violet-500 to-purple-400",
    quick: {
      label: "Write a blog post",
      href: "/dashboard/blog/new"
    }
  },
  {
    key: "contact",
    label: "Contact",
    icon: Mail,
    href: "/dashboard/contact",
    description: "Contact info and social links",
    tile: "from-indigo-500 to-blue-500",
    soon: true
  },
];