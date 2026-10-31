import Link from "next/link";
import { Award, Calendar, ExternalLink, GraduationCap, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { achievements, educations } from "../../generated/prisma";

export function EducationCard({ item }: { item: educations }) {
  return (
    <Card className="bg-white dark:bg-card/70 border border-gray-200 dark:border-white/10 py-0 gap-0 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-300 shadow-sm dark:shadow-none group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 self-start mt-1 bg-gray-100 dark:bg-white/10 rounded-lg group-hover:scale-110 transition-transform">
              <GraduationCap className="h-6 w-6 text-purple-500 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-900 dark:text-foreground">
                {item.institution}
              </h4>
              <p className="text-gray-700 dark:text-foreground/80">{item.degree}</p>
            </div>
          </div>
          {item.gpa && (
            <Badge
              variant="secondary"
              className="shrink-0 bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300"
            >
              GPA: {item.gpa}
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {item.period}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {item.location}
          </div>
        </div>

        <p className="text-gray-700 dark:text-foreground/80 line-clamp-2">
          {item.description}
        </p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Button
          asChild
          variant="outline"
          className="w-full border-gray-300 dark:border-white/15"
        >
          <Link href={`/educations/${item.id}`}>
            <ExternalLink className="h-4 w-4" />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function AchievementCard({ item }: { item: achievements }) {
  return (
    <Card className="bg-white dark:bg-card/70 border border-gray-200 dark:border-white/10 py-0 gap-0 hover:border-yellow-500 dark:hover:border-yellow-400 transition-colors duration-300 shadow-sm dark:shadow-none group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 self-start mt-1 bg-gray-100 dark:bg-white/10 rounded-lg group-hover:scale-110 transition-transform">
              <Award className="h-6 w-6 text-orange-500 dark:text-orange-400" />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-900 dark:text-foreground">
                {item.title}
              </h4>
              <p className="text-gray-700 dark:text-foreground/80">
                {item.organization}
              </p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="shrink-0 bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300"
          >
            {item.year}
          </Badge>
        </div>

        <p className="text-gray-700 dark:text-foreground/80 line-clamp-2">
          {item.description}
        </p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Button
          asChild
          variant="outline"
          className="w-full border-gray-300 dark:border-white/15"
        >
          <Link href={`/achievements/${item.id}`}>
            <ExternalLink className="h-4 w-4" />
            View Details
          </Link>
        </Button>
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
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-foreground">
        {kind === "education" ? (
          <GraduationCap className="h-6 w-6 text-blue-500 dark:text-blue-400" />
        ) : (
          <Award className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
        )}
        {kind === "education" ? "Education" : "Achievements"}
      </h3>
      {empty ? (
        <p className="text-gray-500 dark:text-muted-foreground">Nothing here yet.</p>
      ) : (
        <div className="space-y-6">{children}</div>
      )}
    </div>
  );
}
