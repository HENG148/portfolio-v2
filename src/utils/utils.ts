import clsx, { ClassValue } from "clsx";
import { twMerge } from "cn";

export function cn(...input: ClassValue[]) {
  return twMerge(clsx(input))
}