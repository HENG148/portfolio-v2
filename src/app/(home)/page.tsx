import Footer from "@/src/components/footer";
import AboutSection from "@/src/features/about/components/about-section";
import EducationSection from "@/src/features/education/components/education-section";
import { Experience } from "@/src/features/experience/components/Experience";
// import Footer from "@/src/features/footer/page";
import HeroSection from "@/src/features/hero/components/hero-section";
import ProjectsSection from "@/src/features/projects/components/projectSection";
// import { SidebarFooter } from "@/src/features/sidebar/components/sidebar-components";
import SkillSection from "@/src/features/skills/components/skills-section";
import { generateMetadata } from "@/src/lib/metadata";

export const metadata = generateMetadata({ path: "/" });

export default function Home() {
  return (
    <>
      <div className="">
        <HeroSection />
        <AboutSection />
        <Experience />
        <EducationSection />
        <ProjectsSection />
        <SkillSection />
        {/* <Footer /> */}
      </div>
    </>
  )
}
