import { readdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"];

export async function GET() {
  const dir = path.join(process.cwd(), "public", "image");
  try {
    const files = await readdir(dir);
    const image = files.filter((f) => IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()))
      .sort()
      .map((f) => `/images/${f}`);
    return NextResponse.json({ image });
  } catch (e) {
    console.error("Error reading public/image:", e);
    return NextResponse.json({ image: [] });
  }
}