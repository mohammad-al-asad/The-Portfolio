import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import EducationForm from "@/components/EducationForm";

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const education = await prisma.educations.findUnique({ where: { id } });

  if (!education) notFound();

  return <EducationForm education={education} />;
}
