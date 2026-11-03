import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Award,
  Calendar,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import { PILL_BAR, PILL_BUTTON, PILL_TITLE } from "@/lib/headerPill";

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
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
      <span className="text-sm text-gray-500 dark:text-gray-400">({count})</span>
    </div>
  );
}

export default async function QualificationsPage() {
  const [educations, achievements] = await Promise.all([
    prisma.educations.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.achievements.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="min-h-dvh">
      <div className="page-container">
        <PageHeader pill>
          <div className={`flex py-4 px-6 md:px-16 gap-4 bg-gradient-to-r from-blue-400/15 to-purple-600/15 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 ${PILL_BAR}`}>
            <Button
              asChild
              variant="outline"
              className={`flex items-center border-gray-300 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-800 transition-colors ${PILL_BUTTON}`}
            >
              <Link href="/#qualifications">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className={`text-base sm:text-lg self-center md:text-2xl [word-spacing:3px] font-bold text-gray-900 dark:text-white ${PILL_TITLE}`}>
              Qualifications
            </h1>
          </div>
        </PageHeader>

        <div className="max-w-6xl mx-auto px-4 md:px-[47px] pt-20 md:pt-56 pb-20 space-y-20">
          {/* Intro */}
          <header className="max-w-2xl space-y-4 max-md:pl-9">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              My academic background and the competitions and recognitions
              I&apos;ve earned along the way.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#education"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-4 py-1.5 text-sm hover:border-blue-500 transition-colors"
              >
                <GraduationCap className="h-4 w-4 text-blue-500" />
                {educations.length} Education
              </a>
              <a
                href="#achievements"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-4 py-1.5 text-sm hover:border-amber-500 transition-colors"
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
              <p className="text-gray-500 dark:text-gray-400">Nothing here yet.</p>
            ) : (
              <ol className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 space-y-8">
                {educations.map((item) => (
                  <li key={item.id} className="relative pl-8">
                    <span className="absolute -left-[9px] top-6 h-4 w-4 rounded-full border-4 border-background bg-blue-500" />
                    <Link
                      href={`/educations/${item.id}`}
                      className="group block surface p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {item.period}
                          </p>
                          <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                            {item.institution}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300">
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
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {item.location}
                      </p>
                      <p className="mt-4 text-gray-700 dark:text-gray-300 line-clamp-3">
                        {item.description}
                      </p>
                      {item.courses.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.courses.slice(0, 5).map((c, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 text-xs"
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
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-[gap]">
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
              <p className="text-gray-500 dark:text-gray-400">Nothing here yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((item) => (
                  // Same build as the project card: framed image, title with an arrow,
                  // short text, then a View Details button; the whole card is the link
                  <article
                    key={item.id}
                    className="group relative flex h-full flex-col surface border-2 p-2 transition duration-300 hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:border-amber-400/50"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={`${item.title} certificate`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                          className="object-contain p-3"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Award className="h-12 w-12 text-amber-400" />
                        </div>
                      )}
                      <span className="absolute left-2 top-2 rounded-full bg-amber-500 px-2.5 py-0.5 font-mono text-xs font-medium text-white">
                        {item.year}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold leading-snug text-gray-900 dark:text-white">
                          {/* Stretched link makes the whole card clickable */}
                          <Link
                            href={`/achievements/${item.id}`}
                            className="after:absolute after:inset-0 after:rounded-2xl"
                          >
                            {item.title}
                          </Link>
                        </h3>
                        <span
                          aria-hidden
                          className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-gray-200 text-gray-500 transition-transform duration-300 group-hover:rotate-45 dark:border-gray-700 dark:text-gray-400"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                      <p className="text-sm text-amber-600 dark:text-amber-400 line-clamp-1">
                        {item.organization}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>

                      <div className="mt-auto pt-4">
                        <Button
                          asChild
                          variant="outline"
                          className="relative z-10 w-full border-gray-300 dark:border-gray-600"
                        >
                          <Link href={`/achievements/${item.id}`}>
                            <ExternalLink className="h-4 w-4" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
