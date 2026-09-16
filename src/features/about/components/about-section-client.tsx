import { fadeUp, staggerContainer } from "@/src/lib/motion/variants";
import { motion } from "framer-motion";
import { Highlight } from "./about-hightlights";
import { TagList } from "@/src/components/tag-list";

interface Slide {
  src: string;
  alt?: string;
}

interface AboutSectionProps {
  heading?: string
  bio: string[];
  highlights: { text: string }[];
  tags: string[];
  slides: Slide[];
}

export default function AboutSectionClient({
  heading,
  bio,
  highlights,
  tags,
  // slides
 }: AboutSectionProps) {
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
            {bio.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-zinc-400 text-base md:text-[1.05rem] leading-relaxed">
                {para}
              </motion.p>
            ))}
          </motion.div>

          <Highlight items={highlights} />
          <TagList tags={tags} shape="pill" animated />
        </motion.div>
      </div>
    </section>
  )
}