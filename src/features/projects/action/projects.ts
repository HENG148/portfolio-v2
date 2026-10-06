"use server";

import { withAuthAction } from "@/src/middleware/auth.middleware";
import { ProjectInsert, projectSchema } from "@/src/db/schema/projects.schema";
import { db } from "@/src/db";
import { Project, TbProject } from "@/src/db/table";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { NotFoundError } from "@/src/lib/error";

export type ProjectDetail = Project & {
  number: number;
  total: number;
  prev: { id: Project["id"]; title: string } | null;
  next: { id: Project["id"]; title: string } | null; 
}

export const createProjectAction = withAuthAction(
  async (auth, project: ProjectInsert) => {
    try {
      const validated = projectSchema.safeParse(project);
      if (!validated.success) {
        throw new Error("Invalid project data");
      }

      const projectData = await db
        .insert(TbProject)
        .values(validated.data)
        .returning();

      revalidatePath("/dashboard/project");
      revalidatePath("/");

      return {
        success: true,
        data: projectData,
        message: "Project created successfully",
      };
    } catch (err) {
      if (err instanceof Error) {
        return { success: false, error: err.message };
      }
      return { success: false, error: "Failed to create project" };
    }
  }
);

export const updateProjectAction = withAuthAction(
  async (auth, id: string, project: ProjectInsert) => {
    try {
      const validated = projectSchema.safeParse(project);
      if (!validated.success) {
        throw new Error("Invalid project data");
      }

      const existingProject = await db.query.TbProject.findFirst({
        where: (projectRow, { eq }) => eq(projectRow.id, id),
      });

      if (!existingProject) {
        throw new Error("Project not found");
      }

      const updatedProject = await db
        .update(TbProject)
        .set(validated.data)
        .where(eq(TbProject.id, id))
        .returning();

      revalidatePath("/dashboard/project");
      revalidatePath("/");
      revalidatePath("/projects/[projectId]", "page");

      return {
        success: true,
        data: updatedProject,
        message: "Project updated successfully",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Failed to update project" };
    }
  }
);

export const deleteProjectAction = withAuthAction(
  async (auth, id: string) => {
    try {
      await db
        .update(TbProject)
        .set({ deletedAt: new Date() })
        .where(eq(TbProject.id, id));

      revalidatePath("/dashboard/projects");
      revalidatePath("/");

      return { success: true, message: "Project deleted" };
    } catch (err) {
      if (err instanceof Error) {
        return { success: false, error: err.message };
      }
      return { success: false, error: "Failed to delete project" };
    }
  }
);

export const getProjects = async () => {
  try {
    return await db.query.TbProject.findMany({
      orderBy: (project, { asc, desc }) => [
        asc(project.sortOrder),
        desc(project.createdAt),
      ],
    });
  } catch (err) {
    console.error("Error fetching projects:", err);
    throw new Error("Failed to fetch projects");
  }
};

export const getFeaturedProjects = async () => {
  try {
    return await db.query.TbProject.findMany({
      where: (project, { eq, and, isNull }) =>
        and(eq(project.featured, true), isNull(project.deletedAt)),
      orderBy: (project, { asc, desc }) => [
        asc(project.sortOrder),
        desc(project.createdAt),
      ],
    });
  } catch (err) {
    console.error("Error fetching featured projects:", err);
    throw new Error("Failed to fetch featured projects");
  }
};

export const reorderProjectsAction = withAuthAction(
  async (auth, items: { id: string; sortOrder: number }[]) => {
    try {
      await Promise.all(
        items.map(({ id, sortOrder }) =>
          db.update(TbProject).set({ sortOrder }).where(eq(TbProject.id, id))
        )
      );
      revalidatePath("/dashboard/project");
      revalidatePath("/");
      return { success: true, message: "Projects reordered" };
    } catch (err) {
      if (err instanceof Error) {
        return { success: false, error: err.message };
      }
      return { success: false, error: "Failed to reorder projects" };
    }
  }
);

export const getProjectById = async (id: string) => {
  try {
    return await db.query.TbProject.findFirst({
      where: (project, { eq }) => eq(project.id, id),
    });
  } catch (err) {
    console.error("Error fetching project:", err);
    throw new Error("Failed to fetch project");
  }
};

export const getPublicProjects = async () => {
  try {
    return await db.query.TbProject.findMany({
      where: (p, { and, eq, isNull }) =>
        and(eq(p.isActive, true), isNull(p.deletedAt)),
      orderBy: (p, { asc, desc }) => [asc(p.sortOrder), desc(p.createdAt)],
    })
  } catch (err) {
    console.error("Error fetching public projects:", err);
    throw new Error("Failed to fetch projects");
  }
}

export const getHomeProjects = async (limit = 6) => {
  try {
    // one extra row tells us whether to show "See all"
    const rows = await db.query.TbProject.findMany({
      where: (p, { and, eq, isNull }) =>
        and(eq(p.isActive, true), isNull(p.deletedAt)),
      orderBy: (p, { asc, desc }) => [asc(p.sortOrder), desc(p.createdAt)],
      limit: limit + 1,
    });
    return { projects: rows.slice(0, limit), hasMore: rows.length > limit };
  } catch (err) {
    console.error("Error fetching home projects:", err);
    throw new Error("Failed to fetch projects");
  }
};

export async function getProjectDetail(id: string): Promise<ProjectDetail> {
  const project = await db.query.TbProject.findFirst({
    where: (p, { eq, and, isNull }) =>
      and(eq(p.id, id), isNull(p.deletedAt)),
  });

  if (!project) throw new NotFoundError();

  const allProjects = await db.query.TbProject.findMany({
    where: (p, { eq, and, isNull }) =>
      and(eq(p.isActive, true), isNull(p.deletedAt)),
    columns: { id: true, title: true },
    orderBy: (p, { asc, desc }) => [asc(p.sortOrder), desc(p.createdAt)],
  });

  const idx = allProjects.findIndex((p) => p.id === id);
  const total = allProjects.length;
  const prev = idx > 0 ? allProjects[idx - 1] : null;
  const next = idx >= 0 && idx < total - 1 ? allProjects[idx + 1] : null;

  return {
    ...project,
    number: idx + 1,
    total,
    prev,
    next,
  };
};