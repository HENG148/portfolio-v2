import { db } from "@/src/db";
import { TbAbout, TbProject } from "@/src/db/table";
import { count } from "drizzle-orm";
import { ElementType } from "react";

export async function getCounts(): Promise<Record<string, number>> {
  const [[project], [about]] = await Promise.all([
    db.select({ n: count() }).from(TbProject),
    db.select({ n: count() }).from(TbAbout),
  ]);

  return {
    project: project.n,
    about: about.n
  }
}

export interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  time: string;
  status: "Created" | "Updated";
  icon: ElementType
}

export async function getRecentActivity(): Promise<ActivityItem[]>{
  return [];
}