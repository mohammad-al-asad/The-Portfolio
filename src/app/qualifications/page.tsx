import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Calendar,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";

// Served from cache; admin edits refresh it right away (see lib/revalidate)
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Qualifications | Mohammad Al Asad",
  description: "Academic background and professional achievements.",
};

function SectionTitle({
  icon: Icon,
  title,
  count,
  accent,
}: {
  icon: React.ElementType;
  title: string;
  count: number;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className={`p-2 rounded-lg ${accent}`}>
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">
        {title}
      </h2>
      <span className="text-sm text-gray-500 dark:text-muted-foreground">({count})</span>
    </div>
  );
}

export default async function QualificationsPage() {
  const [educations, achievements] = await Promise.all([
    prisma.educations.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.achievements.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="min-h-screen">
      <div className="page-container">
        <PageHeader>
          <div className="flex py-4 px-6 md:px-16 gap-4 bg-gradient-to-r from-blue-400/15 to-purple-600/15 dark:from-blue-500/10 dark:to-purple-600/10 border border-gray-200 dark:border-white/10">
            <Button
              asChild
              variant="outline"
              className="flex items-center border-gray-300 dark:border-white/15 hover:bg-white dark:hover:bg-white/5 transition-colors"
            >
              <Link href="/#qualifications">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-xl self-center md:text-2xl [word-spacing:3px] font-bold text-gray-900 dark:text-foreground">
              Qualifications
            </h1>
          </div>
        </PageHeader>

        <div className="max-w-6xl mx-auto px-4 md:px-10 pt-28 md:pt-56 pb-20 space-y-20">
          {/* Intro */}
          <header className="max-w-2xl space-y-4">
            <p className="text-gray-600 dark:text-muted-foreground text-lg">
              My academic background and the competitions and recognitions
              I&apos;ve earned along the way.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#education"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-card/70 px-4 py-1.5 text-sm hover:border-blue-500 transition-colors"
              >
                <GraduationCap className="h-4 w-4 text-blue-500" />
                {educations.length} Education
              </a>
              <a
                href="#achievements"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-card/70 px-4 py-1.5 text-sm hover:border-amber-500 transition-colors"
              >
                <Award className="h-4 w-4 text-amber-500" />
                {achievements.length} Achievements
              </a>
            </div>
          </header>

          {/* Education timeline */}
          <section id="education" className="scroll-mt-40">
            <SectionTitle
              icon={GraduationCap}
              title="Education"
              count={educations.length}
              accent="bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400"
            />
            {educations.length === 0 ? (
              <p className="text-gray-500 dark:text-muted-foreground">Nothing here yet.</p>
            ) : (
              <ol className="relative border-l-2 border-gray-200 dark:border-white/10 ml-3 space-y-8">
                {educations.map((item) => (
                  <li key={item.id} className="relative pl-8">
                    <span className="absolute -left-[9px] top-6 h-4 w-4 rounded-full border-4 border-background bg-blue-500" />
                    <Link
                      href={`/educations/${item.id}`}
                      className="group block rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-card/70 p-6 shadow-sm dark:shadow-none hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {item.period}
                          </p>
                          <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-foreground">
                            {item.institution}
                          </h3>
                          <p className="text-gray-700 dark:text-foreground/80">
                            {item.degree}
                          </p>
                        </div>
                        {item.gpa && (
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300"
                          >
                            GPA {item.gpa}
                          </Badge>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-gray-500 dark:text-muted-foreground flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {item.location}
                      </p>
                      <p className="mt-4 text-gray-700 dark:text-foreground/80 line-clamp-3">
                        {item.description}
                      </p>
                      {item.courses.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.courses.slice(0, 5).map((c, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="bg-gray-100 dark:bg-card text-gray-700 dark:text-foreground/80 border-gray-300 dark:border-white/15 text-xs"
                            >
                              {c}
                            </Badge>
                          ))}
                          {item.courses.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{item.courses.length - 5}
                            </Badge>
                          )}
                        </div>
                      )}
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                        View details <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </section>

          {/* Achievements grid */}
          <section id="achievements" className="scroll-mt-40">
            <SectionTitle
              icon={Award}
              title="Achievements"
              count={achievements.length}
              accent="bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400"
            />
            {achievements.length === 0 ? (
              <p className="text-gray-500 dark:text-muted-foreground">Nothing here yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((item) => (
                  <Link
                    key={item.id}
                    href={`/achievements/${item.id}`}
                    className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-card/70 shadow-sm dark:shadow-none hover:border-amber-500 dark:hover:border-amber-400 transition-colors"
                  >
                    <div className="relative aspect-[4/3] bg-white border-b border-gray-200 dark:border-white/10">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={`${item.title} certificate`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                          className="object-contain p-3 group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Award className="h-12 w-12 text-amber-400" />
                        </div>
                      )}
                      <Badge className="absolute top-3 right-3 bg-amber-500 text-white">
                        {item.year}
                      </Badge>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-muted-foreground line-clamp-1">
                        {item.organization}
                      </p>
                      <p className="mt-3 text-sm text-gray-700 dark:text-foreground/80 line-clamp-3">
                        {item.description}
                      </p>
                      <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-600 dark:text-amber-400 group-hover:gap-2 transition-all">
                        View details <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
