"use client"

import { useSidebarCollapse } from "@/src/hook/useSidebarCollapse";
import { NAV_ITEM, SectionId } from "../type";
import { useActiveSection } from "@/src/hook/useActiveSection";
import { motion } from "framer-motion";
import { SidebarFooter, SidebarHeader, SidebarProfile, SidebarToggle } from "./sidebar-components";
import { NavButton } from "./sidebar-button";

interface SidebarProps{
  activeSection?: SectionId
  onNavigate?: (id: SectionId) => void;
  defaultCollapsed?: boolean;
}

export default function Sidebar({
  activeSection: externalActive,
  onNavigate, 
  defaultCollapsed = false,
}: SidebarProps) {
  const { collapsed, toggle } = useSidebarCollapse(defaultCollapsed);
  const [active, setActive] = useActiveSection(externalActive);
  const handleNavigate = (id: typeof active) => {
    setActive(id)
    onNavigate?.(id);
  }

  return (
    <motion.aside
        className="relative flex flex-col min-h-screen overflow-hidden shrink-0 bg-[#0c0c0b] border-r border-[#1a1a18] font-mono text-[#e2ddd5]"
        animate={{ width: collapsed ? 56 : 270 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        aria-label="Site navigation"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-40 bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_3px,rgba(0,0,0,0.06)_3px,rgba(0,0,0,0.06)_4px)]" />
        <div className="relative z-10 flex flex-col flex-1">
          <SidebarHeader collapsed={collapsed} />
          <SidebarProfile collapsed={collapsed} />

          <nav className="flex flex-1 flex-col pt-4 pb-1 pl-2" aria-label="Main navigation">
            {NAV_ITEM.map((item, i) => (
              <NavButton key={item.id} item={item} isActive={active === item.id} collapsed={collapsed} index={i} onClick={handleNavigate} />
            ))}
          </nav>

          <SidebarFooter collapsed={collapsed} />
          <SidebarToggle collapsed={collapsed} onToggle={toggle} />
        </div>
      </motion.aside>
  )
}