import WindowTerminal from "@/src/components/windowTerminal";
import HeroContents from "./hero-contents";

export default function HeroSection() {
  return (
    <section id="home" className="mx-auto max-w-7xl py-20 px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">
        <HeroContents
          title={
            <>
              Building modern <br />
              web & mobile <br />
              experience
            </>
        }
          description="Welcome to my portfolio.  I'm Rong Sokheng, a Full-stack developer with a passion for building modern web and UX/UI experiences. I'm a quick learner and always looking for new challenges."
          tags={["Software", "Web", "Mobile", "UX / UI"]}
          actions={[
            { label: "View Projects", variant: "primary" },
            { label: "Contact Me", variant: "outline" },
          ]}
        />
        <div>
          <WindowTerminal />
        </div>
      </div>
    </section>
  )
}