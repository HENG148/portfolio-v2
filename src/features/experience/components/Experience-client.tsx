'use client'

import { motion } from "framer-motion"
import { Experience } from "../type"
import ExperienceCard from "./ExperienceCard"

export default function WorkExperienceClient({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="w-full antialiased">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl tracking-tight font-bold text-white sm:text-5xl">
            Work Experience
          </h2>
          <p className="text-base text-neutral-500 mt-3">
            Recent roles focused on shipping modern products.
          </p>
        </motion.div>

        <div>
          {experience.length === 0 && (
            <p className="text-center text-sm text-neutral-500">No experience added yet.</p>
          )}

          {experience.map((exp, i) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <ExperienceCard experience={exp} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}