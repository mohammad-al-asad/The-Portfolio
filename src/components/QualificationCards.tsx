import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  Calendar,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { achievements, educations } from "../../generated/prisma";

type Accent = "blue" | "amber";

const ACCENT: Record<
  Accent,
  { label: string; stat: string; hover: string; chip: string }
> = {
  blue: {
    label: "text-blue-600 dark:text-blue-400",
    stat: "from-blue-500 to-purple-600",
    hover: "hover:border-blue-400/70 dark:hover:border-blue-400/60",
    chip: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  },
  amber: {
    label: "text-amber-600 dark:text-amber-400",
    stat: "from-amber-500 to-orange-600",
    hover: "hover:border-amber-400/70 dark:hover:border-amber-400/60",
    chip: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  },
};

// A visual card: certificate on the left, title, a highlighted figure and small chips
function QualificationCard({
  href,
  accent,
  kind,
  Icon,
  title,
  subtitle,
  imageUrl,
  stat,
  chips,
}: {
  href: string;
  accent: Accent;
  kind: string;
  Icon: React.ElementType;
  title: string;
  subtitle: string;
  imageUrl?: string | null;
  stat?: { value: string; label: string };
  chips: { Icon: React.ElementType; text: string }[];
}) {
  const a = ACCENT[accent];

  return (
    <Link
      href={href}
      className={`group block overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 shadow-sm dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${a.hover}`}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Certificate */}
        <div className="relative shrink-0 aspect-[4/3] sm:aspect-auto sm:w-44 lg:w-40 xl:w-48 bg-white border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${title} certificate`}
              fill
              sizes="(max-width: 640px) 100vw, 192px"
              className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${a.stat} opacity-90`}
            >
              <Icon className="h-10 w-10 text-white" />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p
                className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${a.label}`}
              >
                <Icon className="h-3.5 w-3.5" />
                {kind}
              </p>
              <h4 className="mt-1 text-lg font-semibold leading-snug text-gray-900 dark:text-white">
                {title}
              </h4>
              <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                {subtitle}
              </p>
            </div>

            {stat && (
              <div className="shrink-0 text-right">
                <p
                  className={`bg-gradient-to-r ${a.stat} bg-clip-text text-2xl font-extrabold leading-none text-transparent`}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {chips.map(({ Icon: ChipIcon, text }) => (
              <span
                key={text}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${a.chip}`}
              >
                <ChipIcon className="h-3.5 w-3.5" />
                {text}
              </span>
            ))}
            <span
              className={`ml-auto inline-flex items-center gap-1 text-sm font-medium ${a.label} transition-all group-hover:gap-2`}
            >
              View details <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function EducationCard({ item }: { item: educations }) {
  return (
    <QualificationCard
      href={`/educations/${item.id}`}
      accent="blue"
      kind="Education"
      Icon={GraduationCap}
      title={item.degree}
      subtitle={item.institution}
      imageUrl={item.imageUrl}
      stat={item.gpa ? { value: item.gpa, label: "GPA" } : undefined}
      chips={[
        { Icon: Calendar, text: item.period },
        ...(item.location
          ? [{ Icon: MapPin, text: item.location.replace(/,(?=\S)/g, ", ") }]
          : []),
      ]}
    />
  );
}

export function AchievementCard({ item }: { item: achievements }) {
  return (
    <QualificationCard
      href={`/achievements/${item.id}`}
      accent="amber"
      kind="Achievement"
      Icon={Award}
      title={item.title}
      subtitle={item.organization}
      imageUrl={item.imageUrl}
      stat={item.year ? { value: item.year, label: "Year" } : undefined}
      chips={item.technologies
        .slice(0, 2)
        .map((t) => ({ Icon: Award, text: t }))}
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
