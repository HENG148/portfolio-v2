import { Briefcase, FolderKanban, GraduationCap, Home, Mail, Newspaper, User, Wrench } from "lucide-react";
import { ReactNode } from "react";

export type SectionId =
  | "home" | "about" | "experience" | "educations" | "projects" | "blog" | "skills" | "contact"

export interface NavItems{
  id: SectionId;
  label: string;
  icon: ReactNode;
  shortcut?: string;
}

export const NAV_ITEM: NavItems[] = [
  { id: "home", label: "Home", icon: <Home size={16} /> },
  { id: "about", label: "About", icon: <User size={16} />, },
  { id: "experience", label: "Experience", icon: <Briefcase size={16} />, },
  { id: "educations", label: "Education", icon: <GraduationCap size={16} />, },
  { id: "projects", label: "Projects", icon: <FolderKanban size={16} />, },
  { id: "blog", label: "Blog", icon: <Newspaper size={16} />, },
  { id: "skills", label: "Skills", icon: <Wrench size={16} />, },
  { id: "contact", label: "Contact", icon: <Mail size={16} />, }, 
]