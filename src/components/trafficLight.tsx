import { AnimatePresence, motion, Variants } from "framer-motion";

const DOTS = ["#ff5f57", "#febc2e", "#28c840"] as const;

export const TrafficLight = () => (
  <div className="flex items-center shrink-0 gap-1">
    {DOTS.map((color) => (
      <span key={color} className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
    ))}
  </div>
)

const fadeSlide: Variants = {
  hidden: { opacity: 0, x: -6 },
  show: { opacity: 1, x: 0 }
}

export const ExpandOnly = ({
  collapsed,
  children,
  className
}: {
    collapsed: boolean;
    children: React.ReactNode;
    className?: string;
  }) => (
  <AnimatePresence>
    {!collapsed && (
      <motion.div
        className={className}
        variants={fadeSlide}
        initial="hidden"
        animate="show"
        exit="hidden"
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
  )