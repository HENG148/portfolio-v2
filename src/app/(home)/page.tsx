import AboutSection from "@/src/features/about/components/about-section";
import HeroSection from "@/src/features/hero/components/hero-section";
import ProjectsSection from "@/src/features/projects/components/projectSection";

export default function Home() {
  return (
    <>
      <div className="">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />

      </div>
    </>
  )
}
