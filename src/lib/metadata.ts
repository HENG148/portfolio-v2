import { Metadata } from "next";

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string[];
  imageUrl?: string;
}

export const generateMetadata = ({
  title = "Rong Sokheng | Full-stack Developer",
  description = "Discover the portfolio of Rong Sokheng, a passionate Full-stack developer creating innovative and meaningful digital experiences. Explore projects, skills, and professional journey.",
  keywords = [
    'Lorn Samnang',
    'Software Developer',
    'Web Development',
    'Frontend Developer',
    'React Developer',
    'Next.js Developer',
    'Portfolio',
    'Full Stack Developer',
    'Tech Portfolio',
    'Developer Portfolio',
    'Software Engineer',
  ],
  imageUrl = "/cover.png",
}: SeoProps): Metadata => {
  const siteUrl = "http://rongsokheng.com";

  return {
    metadataBase: new URL(siteUrl),
    creator: "Rong Sokheng",
    publisher: "Rong Sokheng"
  }
}