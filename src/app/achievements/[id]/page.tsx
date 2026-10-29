import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Calendar } from "lucide-react";
import { prisma } from "@/lib/db";
import QualificationDetail from "@/components/QualificationDetail";

type Props = { params: Promise<{ id: string }> };

const getAchievement = (id: string) =>
  prisma.achievements.findUnique({ where: { id } });

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const achievement = await getAchievement((await params).id);
  return achievement
    ? {
        title: `${achievement.title} | Mohammad Al Asad`,
        description: achievement.description,
      }
    : {};
}

export default async function AchievementDetailPage({ params }: Props) {
  const achievement = await getAchievement((await params).id);

  if (!achievement) notFound();

  return (
    <QualificationDetail
      kind="Achievement"
      accent="amber"
      title={achievement.title}
      subtitle={achievement.organization}
      meta={[{ icon: Calendar, text: achievement.year }]}
      summary={achievement.description}
      details={achievement.detailedDescription}
      chipsTitle="Skills & Technologies"
      chips={achievement.technologies}
      imageUrl={achievement.imageUrl}
    />
  );
}
