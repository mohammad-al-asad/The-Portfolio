import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";

type Meta = { icon: React.ElementType; text: string };

export default function QualificationDetail({
  kind,
  accent,
  title,
  subtitle,
  meta,
  summary,
  details,
  chipsTitle,
  chips,
  imageUrl,
}: {
  kind: string;
  accent: "blue" | "amber";
  title: string;
  subtitle: string;
  meta: Meta[];
  summary: string;
  details?: string | null;
  chipsTitle: string;
  chips: string[];
  imageUrl?: string;
}) {
  const accentText =
    accent === "blue"
      ? "text-blue-600 dark:text-blue-400"
      : "text-amber-600 dark:text-amber-400";

  return (
    <div className="min-h-screen">
      <div className="page-container">
        <PageHeader>
          <div className="flex py-4 px-6 md:px-16 gap-4 bg-gradient-to-r from-blue-400/15 to-purple-600/15 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
            <Button
              asChild
              variant="outline"
              className="flex items-center border-gray-300 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              <Link href="/#qualifications">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-xl self-center md:text-2xl [word-spacing:3px] font-bold text-gray-900 dark:text-white">
              {kind}
            </h1>
          </div>
        </PageHeader>

        <article className="max-w-5xl mx-auto px-4 md:px-[45px] pt-28 md:pt-56 pb-16">
          <header className="space-y-3 border-b border-gray-200 dark:border-gray-700 pb-8">
            <p className={`text-sm font-semibold uppercase tracking-wider ${accentText}`}>
              {kind}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300">{subtitle}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-gray-600 dark:text-gray-400">
              {meta.map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5">
                  <Icon className="h-4 w-4" />
                  {text}
                </span>
              ))}
            </div>
          </header>

          <div
            className={`grid grid-cols-1 gap-10 pt-8 ${
              imageUrl ? "lg:grid-cols-5" : ""
            }`}
          >
            <div className={`space-y-8 ${imageUrl ? "lg:col-span-3" : ""}`}>
              <section>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                  Overview
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {summary}
                </p>
              </section>

              {details && (
                <section>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    Details
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                    {details}
                  </p>
                </section>
              )}

              {chips.length > 0 && (
                <section>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                    {chipsTitle}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {chips.map((chip, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                      >
                        {chip}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {imageUrl && (
              <aside className="lg:col-span-2">
                <div className="lg:sticky lg:top-40 space-y-3">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    Certificate
                  </h3>
                  <a
                    href={imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src={imageUrl}
                      alt={`${title} certificate`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 400px"
                      className="object-contain"
                    />
                  </a>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Click to open full size
                  </p>
                </div>
              </aside>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
