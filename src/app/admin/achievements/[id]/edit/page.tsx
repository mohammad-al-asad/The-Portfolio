import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import AchievementForm from "@/components/AchievementForm";

export default async function EditAchievementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const achievement = await prisma.achievements.findUnique({ where: { id } });

  if (!achievement) notFound();

  return <AchievementForm achievement={achievement} />;
}
