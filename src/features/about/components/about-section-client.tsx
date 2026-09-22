'use client'

import { fadeUp, staggerContainer } from "@/src/lib/motion/variants";
import { motion } from "framer-motion";
import { Highlight } from "./about-hightlights";
import { TagList } from "@/src/components/tag-list";
import { ImageCarousel } from "@/src/components/Image-Carousel";
import { Slide } from "../type";

interface AboutSectionProps {
  heading?: string
  bio: string;
  highlights: { text: string }[];
  tags: { label: string }[];
  slides: Slide[];
}

export default function AboutSectionClient({
  heading = "About Me",
  bio,
  highlights,
  tags,
  slides
}: AboutSectionProps) {
  
  const paragraph = bio
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  return (
    <section id="about" className="max-w-7xl mx-auto py-20 px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white"
          >
            {heading}
          </motion.h2>

          <motion.div variants={staggerContainer(0.15)} className="flex flex-col gap-4">
            {paragraph.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-zinc-400 text-base md:text-[1.05rem] leading-relaxed">
                {para}
              </motion.p>
            ))}
          </motion.div>

          <Highlight items={highlights} />
          {/* <TagList tags={tags} shape="pill" animated /> */}
          <TagList tags={tags.map((t) => t.label)} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <ImageCarousel slides={slides} />
        </motion.div> 
      </div>
    </section>
  )
}