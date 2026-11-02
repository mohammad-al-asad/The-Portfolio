import Link from "next/link";
import {
  ArrowRight,
  Award,
  Calendar,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { achievements, educations } from "../../generated/prisma";

// Shared look for both card types; only the accent colour differs
const CARD =
  "relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700/80 py-0 gap-0 shadow-sm dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group";

const ACCENT = {
  blue: {
    bar: "from-blue-500 to-purple-600",
    hover: "hover:border-blue-400/60 dark:hover:border-blue-400/50",
    icon: "from-blue-500/15 to-purple-600/15 text-blue-600 dark:text-blue-400",
    badge:
      "bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-500/30",
    button:
      "group-hover:border-blue-400/60 group-hover:text-blue-600 dark:group-hover:text-blue-400",
  },
  amber: {
    bar: "from-amber-400 to-orange-500",
    hover: "hover:border-amber-400/60 dark:hover:border-amber-400/50",
    icon: "from-amber-400/20 to-orange-500/15 text-amber-600 dark:text-amber-400",
    badge:
      "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/30",
    button:
      "group-hover:border-amber-400/60 group-hover:text-amber-600 dark:group-hover:text-amber-400",
  },
} as const;

function DetailsButton({
  href,
  accent,
}: {
  href: string;
  accent: keyof typeof ACCENT;
}) {
  return (
    <Button
      asChild
      variant="outline"
      className={`w-full rounded-xl border-gray-200 dark:border-gray-700 transition-colors ${ACCENT[accent].button}`}
    >
      <Link href={href}>
        View Details
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </Button>
  );
}

export function EducationCard({ item }: { item: educations }) {
  const a = ACCENT.blue;
  return (
    <Card className={`${CARD} ${a.hover}`}>
      {/* Accent line along the top */}
      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${a.bar}`}
      />
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`shrink-0 rounded-xl bg-gradient-to-br p-2.5 transition-transform duration-300 group-hover:scale-110 ${a.icon}`}
            >
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-lg leading-snug text-gray-900 dark:text-white">
                {item.institution}
              </h4>
              <p className="mt-0.5 text-gray-600 dark:text-gray-300">
                {item.degree}
              </p>
            </div>
          </div>
          {item.gpa && (
            <Badge
              variant="secondary"
              className={`shrink-0 rounded-full px-2.5 font-semibold ${a.badge}`}
            >
              GPA {item.gpa}
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {item.period}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {item.location}
          </div>
        </div>

        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-2">
          {item.description}
        </p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <DetailsButton href={`/educations/${item.id}`} accent="blue" />
      </CardFooter>
    </Card>
  );
}

export function AchievementCard({ item }: { item: achievements }) {
  const a = ACCENT.amber;
  return (
    <Card className={`${CARD} ${a.hover}`}>
      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${a.bar}`}
      />
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`shrink-0 rounded-xl bg-gradient-to-br p-2.5 transition-transform duration-300 group-hover:scale-110 ${a.icon}`}
            >
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-lg leading-snug text-gray-900 dark:text-white">
                {item.title}
              </h4>
              <p className="mt-0.5 text-gray-600 dark:text-gray-300">
                {item.organization}
              </p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className={`shrink-0 rounded-full px-2.5 font-semibold ${a.badge}`}
          >
            {item.year}
          </Badge>
        </div>

        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-2">
          {item.description}
        </p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <DetailsButton href={`/achievements/${item.id}`} accent="amber" />
      </CardFooter>
    </Card>
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
  const isEdu = kind === "education";
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
        <span
          className={`inline-flex rounded-xl bg-gradient-to-br p-2 text-white shadow-md ${
            isEdu
              ? "from-blue-500 to-purple-600"
              : "from-amber-400 to-orange-500"
          }`}
        >
          {isEdu ? (
            <GraduationCap className="h-5 w-5" />
          ) : (
            <Award className="h-5 w-5" />
          )}
        </span>
        {isEdu ? "Education" : "Achievements"}
      </h3>
      {empty ? (
        <p className="text-gray-500 dark:text-gray-400">Nothing here yet.</p>
      ) : (
        <div className="space-y-6">{children}</div>
      )}
    </div>
  );
}
