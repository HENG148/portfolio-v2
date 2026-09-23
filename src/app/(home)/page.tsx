import AboutSection from "@/src/features/about/components/about-section";
import { Experience } from "@/src/features/experience/components/Experience";
import HeroSection from "@/src/features/hero/components/hero-section";
import ProjectsSection from "@/src/features/projects/components/projectSection";
import { generateMetadata } from "@/src/lib/metadata";

export const metadata = generateMetadata({ path: "/" });

export default function Home() {
  return (
    <>
      <div className="">
        <HeroSection />
        <AboutSection />
        <Experience />
        <ProjectsSection />
      </div>
    </>
  )
}
