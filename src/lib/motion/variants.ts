import { Variants } from "framer-motion";

export const staggerContainer = (staggerChildren: number = 0.12): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren } },
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
}