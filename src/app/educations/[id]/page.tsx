import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Calendar, GraduationCap, MapPin } from "lucide-react";
import { prisma } from "@/lib/db";
import QualificationDetail from "@/components/QualificationDetail";

type Props = { params: Promise<{ id: string }> };

const getEducation = (id: string) =>
  prisma.educations.findUnique({ where: { id } });

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const education = await getEducation((await params).id);
  return education
    ? {
        title: `${education.degree} - ${education.institution} | Mohammad Al Asad`,
        description: education.description,
      }
    : {};
}

export default async function EducationDetailPage({ params }: Props) {
  const education = await getEducation((await params).id);

  if (!education) notFound();

  return (
    <QualificationDetail
      kind="Education"
      accent="blue"
      title={education.institution}
      subtitle={education.degree}
      meta={[
        { icon: Calendar, text: education.period },
        { icon: MapPin, text: education.location },
        ...(education.gpa
          ? [{ icon: GraduationCap, text: `GPA ${education.gpa}` }]
          : []),
      ]}
      summary={education.description}
      details={education.detailedDescription}
      chipsTitle="Key Courses"
      chips={education.courses}
      imageUrl={education.imageUrl}
    />
  );
}
