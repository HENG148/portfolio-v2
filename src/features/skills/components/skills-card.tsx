import { SkillCategory } from "../action";

export default function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-white/3 p-6 flex flex-col gap-5 hover:border-white/15 hover:bg-white/5 transition-all duration-300 ease-out">
      <h3 className="text-sm font-semibold text-white tracking-widest uppercase">
        {category.title}
      </h3>
 
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#aaa] tracking-wide hover:border-white/20 hover:text-white transition-colors duration-200 cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
  // return (
  //   <div className="rounded-lg border border-zinc-800 bg-[#0d0d0d] overflow-hidden">
  //     <div className="flex items-center gap-1.5 px-3 py-2 border-b border-zinc-800">
  //       <span className="w-2 h-2 rounded-full bg-zinc-700" />
  //       <span className="w-2 h-2 rounded-full bg-zinc-700" />
  //       <span className="w-2 h-2 rounded-full bg-zinc-700" />
  //       <span className="ml-1.5 text-[11px] font-mono text-zinc-500 truncate">
  //         {category.title.toLowerCase().replace(/\s+/g, "-")}.json
  //       </span>
  //     </div>

  //     <div className="p-4">
  //       <p className="font-mono text-[12px] text-green-400/80 mb-2.5">
  //         <span className="text-zinc-600">$</span> ls {category.title}/
  //       </p>
  //       <ul className="flex flex-col gap-1.5">
  //         {category.skills.map((skill) => (
  //           <li
  //             key={skill}
  //             className="font-mono text-[13px] text-zinc-300 flex items-start gap-2"
  //           >
  //             <span className="text-zinc-600">-</span>
  //             <span>{skill}</span>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   </div>
  // );
}