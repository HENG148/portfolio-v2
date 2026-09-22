import { db } from "@/src/db";
import { TbMedia } from "@/src/db/table/upload.table";
import { auth } from "@/src/lib/auth/auth";
import cloudinary from "@/src/lib/cloudinary";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: Promise<{ publicId: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({
      error: "Unauthorized"
    }, { status: 401})
  }

  const { publicId } = await params;
  try {
    await cloudinary.uploader.destroy(publicId);
    await db.delete(TbMedia).where(eq(TbMedia.publicId, publicId));
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Deleted filed: ", e);
    return NextResponse.json({ error: "Deleted failed" }, { status: 500 });
  }
}