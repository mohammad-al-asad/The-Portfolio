import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { achievements, educations } from "../../generated/prisma";
import {
  AchievementCard,
  EducationCard,
  QualificationColumn,
} from "./QualificationCards";

// Show featured items; until any are marked featured, show them all
function featuredOrAll<T extends { featured: boolean | null }>(items: T[]) {
  const featured = items.filter((i) => i.featured);
  return featured.length ? featured : items;
}

export default function Qualification({
  educations,
  achievements,
}: {
  educations: educations[];
  achievements: achievements[];
}) {
  const education = featuredOrAll(educations);
  const achievement = featuredOrAll(achievements);

  return (
    <section id="qualifications" className="py-16">
      <SectionHeader
        title="Qualifications"
        subtitle="Where I studied and what I've earned along the way"
        action={
          <Button asChild variant="outline" className="dark:border-gray-700">
            <Link href="/qualifications">
              View All Qualifications <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <QualificationColumn kind="education" empty={education.length === 0}>
          {education.map((item) => (
            <EducationCard key={item.id} item={item} />
          ))}
        </QualificationColumn>

        <QualificationColumn kind="achievement" empty={achievement.length === 0}>
          {achievement.map((item) => (
            <AchievementCard key={item.id} item={item} />
          ))}
        </QualificationColumn>
      </div>
    </section>
  );
}
