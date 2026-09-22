"use server";

import { withAuthAction } from "@/src/middleware/auth.middleware";
import { AboutInsert, aboutSchema } from "@/src/db/schema/about.schema";
import { db } from "@/src/db";
import { TbAbout } from "@/src/db/table";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export const getAbout = async () => {
  for (let attempt = 1; attempt <= 3; attempt++){
    try {
      return (await db.query.TbAbout.findFirst()) ?? null;
    } catch (err: any) {
      if (attempt < 3) await new Promise((r) => setTimeout(r, 500 * attempt));
    }
    return null;
  }
  // try {
  //   return (await db.query.TbAbout.findFirst()) ?? null;
  // } catch (err) {
  //   console.error("Error fetching about:", err);
  //   throw new Error("Failed to fetch about section");
  // }
};

export const upsertAboutAction = withAuthAction(
  async (auth, about: AboutInsert) => {
    try {
      const validated = aboutSchema.safeParse(about);
      if (!validated.success) {
        console.log("Zod validation errors:", JSON.stringify(validated.error.issues, null, 2));
        return { success: false, error: "Invalid about data" };
      }

      const existing = await db.query.TbAbout.findFirst();

      const result = existing
        ? await db
            .update(TbAbout)
            .set(validated.data)
            .where(eq(TbAbout.id, existing.id))
            .returning()
        : await db.insert(TbAbout).values(validated.data).returning();

      revalidatePath("/dashboard/about");
      revalidatePath("/");

      return {
        success: true,
        data: result,
        message: existing ? "About updated successfully" : "About created successfully",
      };
    } catch (err) {
      if (err instanceof Error) {
        return { success: false, error: err.message };
      }
      return { success: false, error: "Failed to save about section" };
    }
  }
);