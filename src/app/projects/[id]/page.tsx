import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Users } from "lucide-react";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import ProjectGallery from "@/components/ProjectGallery";
import {
  getProjectCategoryIds,
  getProjectImages,
  getProjectLinks,
  linkMeta,
} from "@/lib/project";

// Served from cache; admin edits refresh it right away (see lib/revalidate)
export const revalidate = 3600;

// Build each page on its first visit, then serve it from the cache
export async function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ id: string }> };

const getProject = (id: string) => prisma.projects.findUnique({ where: { id } });

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).id);
  return project
    ? {
        title: `${project.title} | Mohammad Al Asad`,
        description: project.description,
      }
    : {};
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProject((await params).id);

  if (!project) notFound();

  const links = getProjectLinks(project);
  const categories = await prisma.categories.findMany({
    where: { id: { in: getProjectCategoryIds(project) } },
  });

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
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-xl self-center md:text-2xl [word-spacing:3px] font-bold text-gray-900 dark:text-white truncate">
              Project Details
            </h1>
          </div>
        </PageHeader>

        <article className="max-w-5xl mx-auto px-4 md:px-[45px] pt-28 md:pt-56 pb-16 space-y-10">
          {/* Title & summary */}
          <header className="space-y-4">
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Link key={c.id} href={`/projects?category=${c.id}`}>
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-300 hover:opacity-80"
                    >
                      {c.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Gallery (primary image first) */}
          <ProjectGallery
            images={getProjectImages(project)}
            title={project.title}
          />

          {/* Links */}
          {links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {links.map((link, i) => {
                const { label, icon: Icon } = linkMeta(link.type);
                return (
                  <Button
                    key={i}
                    asChild
                    variant={i === 0 ? "default" : "outline"}
                    className={i === 0 ? "" : "border-gray-300 dark:border-gray-600"}
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <Icon className="h-4 w-4" />
                      {link.label || label}
                    </a>
                  </Button>
                );
              })}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-3">
                  About This Project
                </h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {project.detailedDescription || project.description}
                </p>
              </section>

              {project.features.length > 0 && (
                <section>
                  <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-3">
                    Key Features
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                      >
                        <span className="mt-2 w-2 h-2 shrink-0 bg-purple-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {(project.completionDate || project.teamSize) && (
                <section className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 space-y-3">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    Project Details
                  </h3>
                  {project.completionDate && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>Completed: {project.completionDate}</span>
                    </div>
                  )}
                  {project.teamSize && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>Team: {project.teamSize}</span>
                    </div>
                  )}
                </section>
              )}

              {project.technologies.length > 0 && (
                <section className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}
            </aside>
          </div>
        </article>
      </div>
    </div>
  );
}
