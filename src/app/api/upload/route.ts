import { db } from "@/src/db";
import { TbMedia } from "@/src/db/table/upload.table";
import { auth } from "@/src/lib/auth/auth";
import cloudinary from "@/src/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_SIZE = 4 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const form = await req.formData();
  const file = form.get("file");
  const alt = form.get("alt");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large (max 4MB)" }, { status: 413 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "portfolio/about", resource_type: "image" },
        (err, res) => (err || !res ? reject(err) : resolve(res)),
      )
        .end(buffer);
    });

    const [media] = await db
      .insert(TbMedia)
      .values({
        url: result.secure_url,
        publicId: result.public_id,
        alt: typeof alt === "string" ? alt : null,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
        formet: result.format,
      })
      .returning();
    return NextResponse.json(media);
  } catch (e) {
    console.error("cloudinary upload failed:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}