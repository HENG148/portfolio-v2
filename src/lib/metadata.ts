import type { Metadata } from "next";

const SITE_NAME = "Rong Sokheng";
const SITE_URL = "https://domain.com"; // update once you have a real domain
const DEFAULT_DESCRIPTION =
  "Portfolio of Rong Sokheng, IT Full-Stack Developer and Computer Science graduate from RUPP, specializing in TypeScript, Next.js, and Node.js.";
const DEFAULT_IMAGE = "/cover.jpg";

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  path?: string;
}

export function generateMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  imageUrl = DEFAULT_IMAGE,
  path = "",
}: GenerateMetadataProps = {}): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Full-Stack Developer`;

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: `${SITE_NAME}'s Portfolio`,
      title: fullTitle,
      description,
      locale: "en_US",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}