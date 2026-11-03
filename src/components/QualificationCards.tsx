import Link from "next/link";
import { ArrowRight, Award, Calendar, GraduationCap, MapPin } from "lucide-react";
import { achievements, educations } from "../../generated/prisma";

// Shared look for education and achievement cards: a coloured accent bar on
// the left, an icon tile and a mono date label on top, a faint oversized icon
// in the corner, and a "View details" line. The whole card is the link.
const KIND = {
  education: {
    icon: GraduationCap,
    bar: "from-blue-500 to-purple-600",
    tile: "bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400",
    text: "text-blue-600 dark:text-blue-400",
    hover: "hover:border-blue-400/70 dark:hover:border-blue-400/50 hover:shadow-blue-500/10",
  },
  achievement: {
    icon: Award,
    bar: "from-amber-400 to-orange-500",
    tile: "bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400",
    text: "text-amber-600 dark:text-amber-400",
    hover: "hover:border-amber-400/70 dark:hover:border-amber-400/50 hover:shadow-amber-500/10",
  },
} as const;

function QualificationCard({
  kind,
  href,
  date,
  title,
  subtitle,
  meta,
  description,
}: {
  kind: keyof typeof KIND;
  href: string;
  date: string;
  title: string;
  subtitle: string;
  meta?: React.ReactNode;
  description: string;
}) {
  const k = KIND[kind];
  const Icon = k.icon;
  return (
    <article
      className={`group relative isolate overflow-hidden surface p-5 pl-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl md:p-6 md:pl-7 ${k.hover}`}
    >
      {/* Accent bar; widens a little on hover */}
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b transition-[width] duration-300 group-hover:w-1.5 ${k.bar}`}
      />
      {/* Oversized faint icon in the corner, behind the text (isolate + -z-10) */}
      <Icon
        aria-hidden
        className="pointer-events-none absolute -z-10 -bottom-6 -right-6 h-32 w-32 text-gray-900/[0.04] transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110 dark:text-white/[0.04]"
      />

      <div className="flex items-center justify-between gap-3">
        <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${k.tile}`}>
          <Icon className="h-5 w-5" />
        </span>
        <span className="flex min-w-0 items-center gap-1.5 truncate rounded-full border border-gray-200 px-2.5 py-1 font-mono text-xs text-gray-600 dark:border-gray-700 dark:text-gray-400">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{date}</span>
        </span>
      </div>

      <h4 className="mt-4 text-lg font-semibold leading-snug text-gray-900 dark:text-white">
        {/* Stretched link makes the whole card clickable */}
        <Link href={href} className="after:absolute after:inset-0">
          {title}
        </Link>
      </h4>
      <p className="text-gray-700 dark:text-gray-300">{subtitle}</p>

      {meta && (
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
          {meta}
        </div>
      )}

      <p className="mt-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>

      <span className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium ${k.text}`}>
        View details
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </article>
  );
}

export function EducationCard({ item }: { item: educations }) {
  return (
    <QualificationCard
      kind="education"
      href={`/educations/${item.id}`}
      date={item.period}
      title={item.institution}
      subtitle={item.degree}
      description={item.description}
      meta={
        <>
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {item.location}
          </span>
          {item.gpa && (
            <span className="font-medium text-gray-700 dark:text-gray-300">
              GPA {item.gpa}
            </span>
          )}
        </>
      }
    />
  );
}

export function AchievementCard({ item }: { item: achievements }) {
  return (
    <QualificationCard
      kind="achievement"
      href={`/achievements/${item.id}`}
      date={String(item.year)}
      title={item.title}
      subtitle={item.organization}
      description={item.description}
    />
  );
}

export function QualificationColumn({
  kind,
  children,
  empty,
}: {
  kind: "education" | "achievement";
  children: React.ReactNode;
  empty: boolean;
}) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
        {kind === "education" ? (
          <GraduationCap className="h-6 w-6 text-blue-500 dark:text-blue-400" />
        ) : (
          <Award className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
        )}
        {kind === "education" ? "Education" : "Achievements"}
      </h3>
      {empty ? (
        <p className="text-gray-500 dark:text-gray-400">Nothing here yet.</p>
      ) : (
        <div className="space-y-6">{children}</div>
      )}
    </div>
  );
}
