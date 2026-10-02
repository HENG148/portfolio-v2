"use server"

import { db } from "@/src/db";
import { eq } from "drizzle-orm";
import { TbSkillCategory } from "@/src/db/table/skills.table";
import { withAuthAction } from "@/src/middleware/auth.middleware";
import { SkillCategoryInsert, skillCategorySchema } from "@/src/db/schema/skills.schema";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const getSkillCategories = async (): Promise<SkillCategory[]> => {
  try {
    const rows = await db.query.TbSkillCategory.findMany({
      where: (s, { and, eq, isNull }) => and(eq(s.isActive, true), isNull(s.deletedAt)),
      orderBy: (s, { asc }) => [asc(s.sortOrder), asc(s.createdAt)]
    });
    return rows.map((r) => ({ title: r.title, skills: r.skills }));
  } catch (e) {
    console.error("Error fetching skills:", e);
    throw new Error("Failed to fetch skills");
  }
}

export const getSkillCategoryById = async (id: string) => {
  try {
    return await db.query.TbSkillCategory.findFirst({
      where: (s, { eq }) => eq(s.id, id)
    });
  } catch (e) {
    console.error("Error fetching skill category:", e);
    throw new Error("Failed to fetch skill category");
  }
};

export const createSkillCategoryAction = withAuthAction(
  async (auth, category: SkillCategoryInsert) => {
    try {
      const validated = skillCategorySchema.safeParse(category);
      if (!validated.success) {
        return {
          success: false,
          error: "Invalid skill data",
        }
      }

      const result = await db
        .insert(TbSkillCategory)
        .values({ id: randomUUID(), ...validated.data })
        .returning();
      revalidatePath("/dashboard/skill");
      revalidatePath("/");
      return {
        success: true,
        data: result,
        message: "Skill category created"
      };
    } catch (e) {
      if (e instanceof Error) return { success: false, error: e.message };
      return {
        success: false, error: "Failed to create skill category"
      };
    }
  }
);

export const updateSkillCategoryAction = withAuthAction(
  async (auth, id: string, category: SkillCategoryInsert) => {
    try {
      const validated = skillCategorySchema.safeParse(category);
      if (!validated.success) {
        return { success: false, error: "Invalid skill data" };
      }
 
      const existing = await db.query.TbSkillCategory.findFirst({
        where: (s, { eq }) => eq(s.id, id),
      });
      if (!existing) {
        return { success: false, error: "Skill category not found" };
      }
 
      const result = await db
        .update(TbSkillCategory)
        .set({ ...validated.data, updatedAt: new Date() })
        .where(eq(TbSkillCategory.id, id))
        .returning();
 
      revalidatePath("/dashboard/skill");
      revalidatePath("/");
 
      return { success: true, data: result, message: "Skill category updated" };
    } catch (err) {
      if (err instanceof Error) return { success: false, error: err.message };
      return { success: false, error: "Failed to update skill category" };
    }
  }
);

export const deleteSkillCategoryAction = withAuthAction(
  async (auth, id: string) => {
    try {
      await db
        .update(TbSkillCategory)
        .set({ deletedAt: new Date() })
        .where(eq(TbSkillCategory.id, id));
 
      revalidatePath("/dashboard/skill");
      revalidatePath("/");
 
      return { success: true, message: "Skill category deleted" };
    } catch (err) {
      if (err instanceof Error) return { success: false, error: err.message };
      return { success: false, error: "Failed to delete skill category" };
    }
  }
);
 
export const reorderSkillCategoriesAction = withAuthAction(
  async (auth, items: { id: string; sortOrder: number }[]) => {
    try {
      await Promise.all(
        items.map(({ id, sortOrder }) =>
          db
            .update(TbSkillCategory)
            .set({ sortOrder })
            .where(eq(TbSkillCategory.id, id))
        )
      );
      revalidatePath("/dashboard/skill");
      revalidatePath("/");
      return { success: true, message: "Skills reordered" };
    } catch (err) {
      if (err instanceof Error) return { success: false, error: err.message };
      return { success: false, error: "Failed to reorder skills" };
    }
  }
);
 