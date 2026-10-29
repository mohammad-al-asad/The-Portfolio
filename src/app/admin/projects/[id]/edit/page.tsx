import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ProjectForm from "@/components/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.projects.findUnique({ where: { id } });

  if (!project) notFound();

  return <ProjectForm project={project} />;
}
