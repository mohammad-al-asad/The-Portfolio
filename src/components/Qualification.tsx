"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { achievements, educations } from "../../generated/prisma";
import { QualificationCardSkeleton } from "./CardSkeletons";
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

export default function Qualification() {
  const [education, setEducation] = useState<educations[]>([]);
  const [achievement, setAchievement] = useState<achievements[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eduRes, achRes] = await Promise.all([
          fetch("/api/educations"),
          fetch("/api/achievements"),
        ]);
        if (eduRes.ok && achRes.ok) {
          const [eduData, achData] = await Promise.all([
            eduRes.json(),
            achRes.json(),
          ]);
          setEducation(featuredOrAll(eduData));
          setAchievement(featuredOrAll(achData));
        }
      } catch (error) {
        console.error("Error fetching qualifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const skeletons = [0, 1].map((i) => <QualificationCardSkeleton key={i} />);

  return (
    <section id="qualifications" className="py-16">
      <SectionHeader
        title="Qualifications"
        subtitle="My academic background and professional accomplishments"
        action={
          <Button asChild variant="outline" className="dark:border-gray-700">
            <Link href="/qualifications">
              View All Qualifications <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <QualificationColumn
          kind="education"
          empty={!loading && education.length === 0}
        >
          {loading
            ? skeletons
            : education.map((item) => (
                <EducationCard key={item.id} item={item} />
              ))}
        </QualificationColumn>

        <QualificationColumn
          kind="achievement"
          empty={!loading && achievement.length === 0}
        >
          {loading
            ? skeletons
            : achievement.map((item) => (
                <AchievementCard key={item.id} item={item} />
              ))}
        </QualificationColumn>
      </div>
    </section>
  );
}
