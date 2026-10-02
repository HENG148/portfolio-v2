"use server"

import { db } from "@/src/db";
import { EducationInsert, educationSchema } from "@/src/db/schema/education.schema";
import { TbEducation, TbProject } from "@/src/db/table";
import { withAuthAction } from "@/src/middleware/auth.middleware";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

function refresh() {
  revalidatePath("/dashboard/education");
  revalidatePath("/");
}

export const saveEducationAction = withAuthAction(
  async (auth, input: EducationInsert, id?: string) => {
    const parsed = educationSchema.safeParse(input);
    if (!parsed.success) {
      console.log("Zod errors:", JSON.stringify(parsed.error.issues, null, 2));
      return { success: false, error: "Invalid education data" };
    }
    try {
      if (id) await db.update(TbEducation).set(parsed.data).where(eq(TbEducation.id, id));
      else await db.insert(TbEducation).values(parsed.data);
      refresh();
      return { success: true };
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : "Failed to save" };
    }
  }
);

export const deleteEducationAction = withAuthAction(async (auth, id: string) => {
  try {
    await db.update(TbEducation).set({ deletedAt: new Date() }).where(eq(TbEducation.id, id));
    refresh();
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to delete" };
  }
});