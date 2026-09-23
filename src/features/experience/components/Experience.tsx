import { getExperience } from "../action/experience"
import WorkExperienceClient from "./Experience-client";

export const Experience: React.FC = async () => {
  const experience = await getExperience();
  return <WorkExperienceClient experience={experience} />
} 