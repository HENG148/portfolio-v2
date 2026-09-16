// import { auth } from "@/src/lib/auth/auth";
import { withAuthAction } from "@/src/middleware/auth.middleware";
import { ProjectInsert, projectSchema } from "@/src/db/schema/projects.schema";
import { db } from "@/src/db";
import { TbProject } from "@/src/db/table";
import { revalidatePath } from "next/cache";
import { and, eq, isNull } from "drizzle-orm";
import { NotFoundError } from "@/src/lib/error";

export const createProjectAction = withAuthAction(
  async (auth, project: ProjectInsert) => {
    try {
      const validated = projectSchema.safeParse(project);
      if (!validated.success) {
        throw new Error("Invalid project data");
      }

      if (!auth.profile) {
        throw new Error("Profile not found. Please create a profile first.");
      }

      const projectData = await db
        .insert(TbProject)
        .values({ ...project, projectId: auth.profile.id })
        .returning();
      
      revalidatePath("/dashboard/project");
      revalidatePath("/");

      return {
        success: true,
        data: projectData,
        message: "Project created successfully",
      }
    } catch (err) {
      if (err instanceof Error) {
        return {
          success: false,
          error: err.message
        }
      }
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
 
      if (!auth.profile) {
        throw new Error("Profile not found.");
      }
 
      const existingProject = await db.query.TbProject.findFirst({
        where: (projectRow, { eq, and }) =>
          and(eq(projectRow.id, id), eq(projectRow.profileId, auth.profile!.id)),
      });
 
      if (!existingProject) {
        throw new Error("Project not found");
      }
 
      // profileId is never client-controlled — a project's owner can't change.
      const { profileId: _ignoredProfileId, ...safeProject } = project as any;
 
      const updatedProject = await db
        .update(TbProject)
        .set(safeProject)
        .where(
          and(eq(TbProject.id, id), eq(TbProject.profileId, auth.profile.id))
        )
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

export const getProjects = async () => {
  try {
    const projects = await db.query.TbProject.findMany({
      orderBy: (project, { asc, desc }) => [
        asc(project.sortOrder),
        desc(project.createdAt),
      ]
    })
    return projects;
  } catch (err) {
    console.error("Error fetching projects:", err);
    throw new Error("Failed to fetch projects");
  }
}

export const getFeaturedProjects = async () => {
  try {
    return await db.query.TbProject.findMany({
      where: (project, { eq, and, isNull }) => and(eq(project.featured, true), isNull(project.deletedAt)),
      orderBy: (project, { asc, desc }) => [
        asc(project.sortOrder),
        desc(project.createdAt),
      ]
    })
  } catch (err) {
    console.error("Error fetching featured projects:", err);
    throw new Error("Failed to fetch featured projects");
  }
}

export const reorderProjectsAction = withAuthAction(
  async (auth, items: { id: string; sortOrder: number }[]) => {
    try {
      if (!auth.profile) {
        throw new Error("Profile not found.");
      }
      const profileId = auth.profile.id;
      
      await Promise.all(
        items.map(({ id, sortOrder }) =>
          db
            .update(TbProject)
            .set({ sortOrder })
            .where(and(eq(TbProject.id, id), eq(TbProject.profileId, profileId)))
        )
      );
      revalidatePath("/dashboard/project");
      revalidatePath("/");
      return {
        success: true,
        message: "Projects reordered"
      }
    } catch (err) {
      if (err instanceof Error) {
        return {
          success: false,
          error: err.message
        }
      }
    }
  }
);

export const getProjectById = async (id: string) => {
  try {
    const project = await db.query.TbProject.findFirst({
      where: (project, { eq }) => eq(project.id, id),
    });
    return project;
  } catch (err) {
    console.error("Error fetching project:", err);
    throw new Error("Failed to fetch project");
  }
}

export const getProjectDetail = async (projectId: string) => {
  console.log("Looking up projectId:", projectId);

  const raw = await db.query.TbProject.findFirst({
    where: (p, { eq }) => eq(p.id, projectId),
  });
  console.log("RAW (no filter):", raw);

  const project = await db.query.TbProject.findFirst({
    where: (p, { eq, and, isNull }) =>
      and(eq(p.id, projectId), isNull(p.deletedAt)),
  });
  console.log("FILTERED (with isNull deletedAt):", project);

  if (!project) throw new NotFoundError();

  const allProjects = await db.query.TbProject.findMany({
    where: (p, { eq, and, isNull }) =>
      and(eq(p.isActive, true), isNull(p.deletedAt)),
    columns: { id: true, title: true },
    orderBy: (p, { desc }) => [desc(p.createdAt)],
  });

  const idx = allProjects.findIndex((p) => p.id === projectId);
  const total = allProjects.length;
  const prev = idx > 0 ? allProjects[idx - 1] : null;
  const next = idx >= 0 && idx < total - 1 ? allProjects[idx + 1] : null;

  return {
    ...project.value,
    number: idx + 1,
    total,
    prev,
    next,
  };
};