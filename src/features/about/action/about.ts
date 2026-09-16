import { withAuthAction } from "@/src/middleware/auth.middleware";
import { AboutInsert, aboutSchema } from "@/src/db/schema/about.schema";
import { db } from "@/src/db";
import { TbAbout } from "@/src/db/table";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export const getAbout = async () => {
  try {
    const about = await db.query.TbAbout.findFirst();
    return about ?? null;
  } catch (err) {
    console.error("Error fetching about:", err);
    throw new Error("Failed to fetch about section");
  }
};

export const upsertAboutAction = withAuthAction(
  async (auth, about: AboutInsert) => {
    try {
      const validated = aboutSchema.safeParse(about);
      if (!validated.success) {
        return { success: false, error: "Invalid about data" };
      }

      if (!auth.profile) {
        throw new Error("Profile not found. Please create a profile first.");
      }

      const profileId = auth.profile.id;

      const existing = await db.query.TbAbout.findFirst({
        where: (a, { eq }) => eq(a.profileId, profileId),
      });

      const result = existing
        ? await db
            .update(TbAbout)
            .set(validated.data)
            .where(eq(TbAbout.profileId, profileId))
            .returning()
        : await db
            .insert(TbAbout)
            .values({ ...validated.data, profileId })
            .returning();

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