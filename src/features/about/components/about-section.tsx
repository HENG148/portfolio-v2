import { getAbout } from "../action";
import AboutSectionClient from "./about-section-client";

export default async function AboutSection() {
  const about = await getAbout();

  if (!about) return null;

  return (
    <AboutSectionClient
      bio={about.bio}
      highlights={about.highlights}
      tags={about.tags}
      slides={about.slides}
    />
  );
}