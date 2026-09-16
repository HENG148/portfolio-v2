import Image from "next/image";
import ProjectsSection from "../features/projects/components/projectSection";
import AboutSection from "../features/about/components/about-section";

export default function Home() {
  return (
    <>
      <AboutSection />
      <ProjectsSection />
    </>
  )
}
