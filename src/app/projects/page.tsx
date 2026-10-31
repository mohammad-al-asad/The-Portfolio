import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import ProjectsBrowser from "@/components/ProjectsBrowser";

export const metadata: Metadata = {
  title: "Projects | Mohammad Al Asad",
  description: "Mobile apps, web apps and backends I've built, filterable by category and technology.",
};

// Served from cache; admin edits refresh it right away (see lib/revalidate)
export const revalidate = 3600;

export default async function ProjectsPage() {
  const [allProjects, allCategories] = await Promise.all([
    prisma.projects.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.categories.findMany(),
  ]);

  return <ProjectsBrowser allProjects={allProjects} allCategories={allCategories} />;
}
