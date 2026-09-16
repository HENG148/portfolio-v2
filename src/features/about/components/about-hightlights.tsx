import { fadeUp, staggerContainer } from "@/src/lib/motion/variants";
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react";

interface HighlightProps {
  items: readonly { text: string }[];
}

export function Highlight({ items }: HighlightProps) {
  return (
    <motion.ul variants={staggerContainer()}
      className="flex flex-col gap-3">
      {items.map(({ text }, i) => (
        <motion.li
          key={`${text}-${i}`}
          variants={fadeUp}
          className="flex items-start gap-3 group"
        >
          <CheckCircle
            size={17}
            className="mt-0.5 shrink-0 text-zinc-400 group-hover:text-white transition"
            strokeWidth={1.8}
          />
          <span className="text-zinc-300 text-sm group-hover:text-white transition">{text}</span>
        </motion.li>
      ))}
    </motion.ul>
  )
}