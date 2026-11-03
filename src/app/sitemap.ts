import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, educations, achievements] = await Promise.all([
    prisma.projects.findMany({ select: { id: true, updatedAt: true } }),
    prisma.educations.findMany({ select: { id: true, updatedAt: true } }),
    prisma.achievements.findMany({ select: { id: true, updatedAt: true } }),
  ]);

  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/projects`, priority: 0.9 },
    { url: `${SITE_URL}/qualifications`, priority: 0.7 },
    ...projects.map((p) => ({ url: `${SITE_URL}/projects/${p.id}`, lastModified: p.updatedAt })),
    ...educations.map((e) => ({ url: `${SITE_URL}/educations/${e.id}`, lastModified: e.updatedAt })),
    ...achievements.map((a) => ({ url: `${SITE_URL}/achievements/${a.id}`, lastModified: a.updatedAt })),
  ];
}
