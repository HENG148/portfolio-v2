import { BriefcaseIcon, ZapIcon } from "@/src/components/svg/svg";
import { Experience } from "../type";


const BulletItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start gap-2.5 text-sm leading-relaxed text-neutral-400 transition-colors duration-200 group-hover:text-neutral-300">
    <ZapIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-600 group-hover:text-neutral-400 duration-300 transition-colors" />
    <span>{text}</span>
  </li>
);

const CardHeader: React.FC<{ experience: Experience }> = ({ experience }) => (
  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800/60 group-hover:border-neutral-500 transition">
        <BriefcaseIcon className="h-4 w-4 text-neutral-400 group-hover:text-neutral-200 transition"/>
      </div>
      <div>
        <h3 className="text-[0.95rem] font-semibold text-white">
          {experience.title}
        </h3>
        <p className="text-sm text-neutral-400">{experience.company}</p>
      </div>
    </div>

    <span className="rounded-full border border-neutral-700/70 bg-neutral-800/40 px-3 py-1 text-xs text-neutral-400">
      {experience.period}
    </span>
  </div>
);

const ExperienceCard: React.FC<{ experience: Experience }> = ({ experience }) => (
  <div className="group relative flex gap-6 pb-12 last:pb-9">
    <div className="relative flex flex-col items-center">
      <div className="relative z-10 mt-1 h-3 w-3 shrink-0">
        <div className="h-3 w-3 rounded-full border-neutral-500 bg-neutral-900 transition-colors duration-300 group-hover:border-white group-hover:bg-white" />
      </div>
      <div className="mt-2 w-px flex-1 bg-linear-to-b from-neutral-700 to-transparent" />
    </div>

    <div className="flex-1 pb-2">
      <CardHeader experience={experience} />

      <ul className="space-y-2.5">
        {experience.bullet.map((b, i) => (
          <BulletItem key={i} text={b.text} />
        ))}
      </ul>
    </div>
  </div>
);

export default ExperienceCard;