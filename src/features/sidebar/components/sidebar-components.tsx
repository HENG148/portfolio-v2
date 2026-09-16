import { cn } from "@/src/lib/utils";
import { GridLogo } from "@/src/components/svg/svg";
import { ExpandOnly, TrafficLight } from "@/src/components/trafficLight";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Link from "next/link";

export const SidebarHeader = ({ collapsed }: { collapsed: boolean }) => (
  <div className="flex items-center gap-2 h-11 px-3.5 border-b border-[#1a1a18]">
    <TrafficLight />
    <ExpandOnly collapsed={collapsed} className="ml-1 overflow-hidden whitespace-normal font-mono text-[12px] tracking-wider text-white">
      Sokheng@portfolio: ~
    </ExpandOnly>
  </div>
)

export const SidebarProfile = ({ collapsed }: { collapsed: boolean }) => (
  <div className={cn(
    "flex items-center border-b border-[#1a1a18]", collapsed ? "justify-center py-3.5 px-0":"gap-2.5 px-3.5 py-4"
  )}>
    <div className="shrink-0 text-[#e2ddd5]">
      <Link href="/">
        <GridLogo />
      </Link>
    </div>
    <ExpandOnly collapsed={collapsed}>
      <p className="whitespace-nowrap font-mono text-[17px] font-semibold tracking-[0.01em] text-[#e2ddd5]">
        Rong Sokheng
      </p>
      <p className="mt-px whitespace-nowrap font-sans text-[12px] tracking-widest text-white">
        Software . Web . UX/UI
      </p>
    </ExpandOnly>
  </div>
)

export const SidebarFooter = ({ collapsed }: { collapsed: boolean }) => (
  <ExpandOnly
    collapsed={collapsed}
    className="flex items-center text-[13px] gap-1.5 border-t border-[#1a1a18] px-3.5 py-2.75"
  >
    <span className="text-white">$</span>
    <span className="text-[#524f4f]">echo &quot;Hello, world!&quot;</span>
    <span className="inline-block h-3.25 w-1.5 bg-[#4d4d4b] animate-blink" />
  </ExpandOnly>
);

export const SidebarToggle = ({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) => (
  <button
    className={cn(
      "flex w-full items-center border-t border-[#1a1a18] bg-transparent cursor-pointer",
      "text-[#524f4f] transition-colors duration-150 hover:bg-white/3 hover:text-[#7a7a76]",
      collapsed ? "justify-center p-3.5" : "justify-end px-3.5 py-2.75"
    )}
    onClick={onToggle}
    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
  >
    {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
  </button>
);