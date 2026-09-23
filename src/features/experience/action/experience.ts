"use server"

import { db } from "@/src/db";
import { Experience } from "../type";
import { eq, isNull } from "drizzle-orm";
import { withAuthAction } from "@/src/middleware/auth.middleware";
import { ExperienceInsert, experienceSchema } from "@/src/db/schema/experience.schema";
import { TbExperience } from "@/src/db/table";
import { revalidatePath } from "next/cache";

export const getExperience = async (): Promise<Experience[]> => {
  try {
    const row = await db.query.TbExperience.findMany({
      where: (e, { isNull, and, eq }) => and(eq(e.isActive, true), isNull(e.deletedAt)),
      orderBy: (e, { asc }) => [asc(e.sortOrder)],
    });
    return row.map((row) => ({
      _id: row.id,
      title: row.title,
      company: row.company,
      period: row.period,
      bullet: row.bullets,
    }));
  } catch (e) {
    console.error("Error fetching experiences:", e);
    throw new Error("Failed to fetch work experience");
  }
}

export const createExperienceAction = withAuthAction(
  async (auth, experience: ExperienceInsert) => {
    try {
      const validated = experienceSchema.safeParse(experience);
      if (!validated.success) {
        return {
          success: false, error: "Invalid experience data"
        }
      }
      const result = await db.insert(TbExperience).values(validated.data).returning();
      revalidatePath("/dashboard/experience");
      revalidatePath("/");
      return {
        success: true,
        data: result,
        message: "Experience created successfully"
      }
    } catch (e) {
      if (e instanceof Error) {
        return { success: false, error: e.message };
      }
      return { success: false, error: "Failed to create experience" };
    }
  }
);

export const updateExperienceAction = withAuthAction(
  async (auth, id: string, experience: ExperienceInsert) => {
    try {
      const validated = experienceSchema.safeParse(experience);
      if (!validated.success) {
        return { success: false, error: "Invalid experience data" };
      }

      const existing = await db.query.TbExperience.findFirst({
        where: (e, { eq }) => eq(e.id, id),
      });

      if (!existing) {
        return { success: false, error: "Experience not found" };
      }

      const result = await db
        .update(TbExperience)
        .set(validated.data)
        .where(eq(TbExperience.id, id))
        .returning();

      revalidatePath("/dashboard/experience");
      revalidatePath("/");

      return { success: true, data: result, message: "Experience updated successfully" };
    } catch (err) {
      if (err instanceof Error) {
        return { success: false, error: err.message };
      }
      return { success: false, error: "Failed to update experience" };
    }
  }
);

export const deleteExperienceAction = withAuthAction(
  async (auth, id: string) => {
    try {
      await db
        .update(TbExperience)
        .set({ deletedAt: new Date() })
        .where(eq(TbExperience.id, id));

      revalidatePath("/dashboard/experience");
      revalidatePath("/");

      return { success: true, message: "Experience deleted" };
    } catch (err) {
      if (err instanceof Error) {
        return { success: false, error: err.message };
      }
      return { success: false, error: "Failed to delete experience" };
    }
  }
);

export const getExperienceById = async (id: string) => {
  try {
    return await db.query.TbExperience.findFirst({
      where: (e, { eq }) => eq(e.id, id),
    });
  } catch (err) {
    console.error("Error fetching experience:", err);
    throw new Error("Failed to fetch experience");
  }
};

export const reorderExperiencesAction = withAuthAction(
  async (auth, items: { id: string; sortOrder: number }[]) => {
    try {
      await Promise.all(
        items.map(({ id, sortOrder }) =>
          db.update(TbExperience).set({ sortOrder }).where(eq(TbExperience.id, id))
        )
      );
      revalidatePath("/dashboard/experience");
      revalidatePath("/");
      return { success: true, message: "Experiences reordered" };
    } catch (err) {
      if (err instanceof Error) {
        return { success: false, error: err.message };
      }
      return { success: false, error: "Failed to reorder" };
    }
  }
);