import { NavItems, SectionId } from "../type";
import { motion } from "framer-motion";

interface NavButtonProps{
  item: NavItems;
  isActive: boolean;
  collapsed: boolean;
  index: number;
  onClick: (id: SectionId) => void;
}

export function NavButton({
  item,
  isActive,
  collapsed,
  index,
  onClick
}: NavButtonProps) {
  const handleClick = () => {
    onClick(item.id);
    document.getElementById(item.id)?.scrollIntoView({behavior: "smooth"})
  }

  return (
    <motion.button
      role="menuitem"
      aria-current={isActive ? "page" : undefined}
      aria-label={item.label}
      title={collapsed ? item.label : undefined}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2, duration: 0.3, ease: "easeOut" }}
      onClick={handleClick}
      className={["group relative flex w-full items-center gap-4 px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-sans text-[11.5px] tracking-[0.06em] transition-colors duration-100", isActive ? "text-[#e2ddd5]" : "text-[#3a3a38] hover:text-[#7a7a76]", collapsed ? "justify-center px-0" : ""].join("")}
    >
      {isActive && (
        <motion.span
          layoutId="active-bar"
          className=" absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-[#e2ddd5]"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}

      <span className={["absolute inset-0 transition-opacity duration-100 bg-white/3", isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"].join("")} />
      
      <span className={['relative z-10 shrink flex items-center justify-center w-4 h-4', isActive ? "text-[#e2ddd5]": "text-[#3a3a38] group-hover:text-[#7a7a76]", "transition-colors duration-100"].join(" ")}>{item.icon}</span>
      {!collapsed && (
        <motion.span
          className="relative z-10 flex-1 text-[13px] text-left whitespace-nowrap overflow-hidden"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.18 }}
        >
          {item.label}
        </motion.span>
      )}

      {/* Keyboard shortcut badge */}
      {!collapsed && item.shortcut && (
        <span className="relative z-10 ml-auto font-mono text-[9px] tracking-[0.08em] text-[#2a2a28] group-hover:text-[#3a3a38] transition-colors duration-100">{item.shortcut}</span>
      )}
    </motion.button>
  )
}