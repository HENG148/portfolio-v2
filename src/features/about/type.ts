export interface Slide {
  src: string;
  alt: string;
}

export interface Highlight {
  text: string;
}
export interface Tag {
  label: string;
}

export const slides: Slide[] = [
  { src: "/me.jpg", alt: "" },
  { src: "/me(3).jpg", alt: "" },
  { src: "/me(4).jpg", alt: "" },
  { src: "/me(5).jpg", alt: ""},
]

export const highlights: Highlight[] = [
  { text: "Product mindset across web, mobile, and startups" },
  { text: "Ship fast with quality: React, Next.js, Node, Express.js" },
  { text: "UX / UI and performance focused" },
]

export const tags: Tag[] = [
  { label: "Software" },
  { label: "Web" },
  // { label: "Mobile" },
  { label: "UX / UI" },
  { label: "Design" },
  { label: "RUPP Graduated" },
  { label: "Open freelance" },
  { label: "Developer"}
]