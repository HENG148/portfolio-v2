import { Architects_Daughter, Caveat } from "next/font/google";
import { FaGithub, FaInstagram, FaLinkedin, FaTelegram } from "react-icons/fa6";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });
const hand = Architects_Daughter({ subsets: ["latin"], weight: "400" });

const NAME = "Rong Sokheng";
const SOCIALS = [
  { label: "linkedin", href: "https://www.linkedin.com/in/rong-sokheng-a20512258/?isSelfProfile=true", Icon: FaLinkedin, color: "#0A66C2" },
  { label: "instagram", href: "https://www.instagram.com/__heng0_/", Icon: FaInstagram, color: "#E4405F" },
  { label: "github", href: "https://github.com/HENG148", Icon: FaGithub, color: "currentColor" },
  { label: "telegram", href: "https://t.me/HenGApril", Icon: FaTelegram, color: "#26A5E4" },
];

export default function Footer() {
  return (
    <footer id="contact" className={` relative border-t border-border bg-background px-6 py-20 text-foreground`}
      style={{
        backgroundImage: "linear-gradient(var(--border) 1px, transpatent 1px, lineaer-gradient(90deg, var(--border) 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
          {"// let's talk"}
        </p>

        <h2 className={`${caveat.className} mt-6 text-5xl font-bold sm:text-6xl`}>
          Say hi{" "}
          <span className="inline-block origin-[70%_70%] animate-[wave_2.2s_ease-in-out_infinite]">
            👋
          </span>
        </h2>

        <p className="mt-6 text-base text-muted-foreground">
          Always building something. Let&apos;s connect.
        </p>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {SOCIALS.map(({ label, href, Icon, color }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[15px] transition-transform duration-200 hover:-translate-y-0.5 hover:-rotate-2"
              >
                <Icon size={18} style={{ color }} />
                {label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-14 -rotate-1 text-[13px] text-muted-foreground/70">
          drawn by hand · built to click · © {NAME} {new Date().getFullYear()}
        </p>
      </div>
    </footer> 
  )
}