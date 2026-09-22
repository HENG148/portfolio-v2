"use client"

import { cn } from "@/src/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../lib/motion/variants";

const tagVariants = cva("px-3.5 py-1 text-xs rounded-md tracking-wide transition", {
  variants: {
    variant: {
      default: "text-neutral-400 border border-neutral-700",
      outline: "text-white border border-white",
    },
    shape: {
      pill: "rounded-full",
      soft: "rounded-md"
    }
  },
  defaultVariants: {
    variant: "default",
    shape: "pill"
  }
})

interface TagListProps extends VariantProps<typeof tagVariants> {
  tags: readonly string[];
  animated?: boolean;
}

export function TagList({ tags, variant, shape, animated = false }: TagListProps) {
  const uniqueTags = Array.from(new Set(tags));

  if (!animated) {
    return (
      <div className="flex flex-wrap gap-2">
        {uniqueTags.map((tag, i) => (
          <span key={`${tag}-${i}`} className={cn(tagVariants({ variant, shape }))}>
            {tag}
          </span>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer()}
      className="flex flex-wrap gap-2"
    >
      {uniqueTags.map((tag, i) => (
        <motion.span
          key={`${tag}-${i}`}
          variants={fadeUp}
          whileHover={{ scale: 1.05, borderColor: "#fff", color: "#fff" }}
          className={cn(tagVariants({ variant }))}
        >
          {tag}
        </motion.span>
      ))}
    </motion.div>
  );
}