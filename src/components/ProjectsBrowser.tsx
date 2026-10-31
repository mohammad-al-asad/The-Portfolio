"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { categories, projects } from "../../generated/prisma";
import SingleProject from "@/components/SingleProject";
import { ArrowLeft, X } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { TECH_FILTERS, getProjectCategoryIds, usesTech } from "@/lib/project";

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-sm transition-colors cursor-pointer ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      {children}
    </button>
  );
}

export default function ProjectsBrowser({
  allProjects,
  allCategories,
}: {
  allProjects: projects[];
  allCategories: categories[];
}) {
  const [category, setCategory] = useState<string | null>(null);
  const [technology, setTechnology] = useState<string | null>(null);
  const filtersRead = useRef(false);

  // Start from the filters in a shared link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCategory(params.get("category"));
    setTechnology(params.get("tech"));
  }, []);

  // Keep the URL in sync so filtered views can be shared
  useEffect(() => {
    // Skip the first run so the shared link's filters are read before overwriting
    if (!filtersRead.current) {
      filtersRead.current = true;
      return;
    }
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (technology) params.set("tech", technology);
    const query = params.toString();
    window.history.replaceState(null, "", query ? `?${query}` : "/projects");
  }, [category, technology]);

  // Only offer categories and technologies that at least one project uses
  const usedCategories = useMemo(() => {
    const used = new Set(allProjects.flatMap(getProjectCategoryIds));
    return allCategories.filter((c) => used.has(c.id));
  }, [allProjects, allCategories]);

  // Curated list of core technologies (not every library a project uses)
  const technologies = useMemo(
    () =>
      TECH_FILTERS.map((f) => f.label).filter((label) =>
        allProjects.some((p) => usesTech(p, label))
      ),
    [allProjects]
  );

  const filtered = allProjects.filter(
    (p) =>
      (!category || getProjectCategoryIds(p).includes(category)) &&
      (!technology || usesTech(p, technology))
  );

  const hasFilters = Boolean(category || technology);

  return (
    <div className="min-h-screen">
      <div className="page-container">
        {/* Header - With Gradient Accent */}
        <PageHeader>
          <div className="flex py-4 px-6 md:px-16 gap-4 bg-gradient-to-r from-blue-400/15 to-purple-600/15 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
            <Button
              asChild
              variant="outline"
              className="flex items-center border-gray-300 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              <Link href="/" aria-label="Back to home">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-xl self-center md:text-2xl [word-spacing:3px] font-bold text-gray-900 dark:text-white">
              Project Gallery
            </h1>
          </div>
        </PageHeader>

          <div className="pt-28 md:pt-56 px-4 md:px-10 pb-24 space-y-8">
            {/* Filters */}
            <div className="space-y-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-4 md:p-6">
              {usedCategories.length > 0 && (
                <div className="flex flex-col md:flex-row md:items-start gap-3">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white md:w-28 md:pt-1 shrink-0">
                    Category
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <FilterChip active={!category} onClick={() => setCategory(null)}>
                      All
                    </FilterChip>
                    {usedCategories.map((c) => (
                      <FilterChip
                        key={c.id}
                        active={category === c.id}
                        onClick={() =>
                          setCategory(category === c.id ? null : c.id)
                        }
                      >
                        {c.name}
                      </FilterChip>
                    ))}
                  </div>
                </div>
              )}

              {technologies.length > 0 && (
                <div className="flex flex-col md:flex-row md:items-start gap-3">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white md:w-28 md:pt-1 shrink-0">
                    Technology
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <FilterChip
                      active={!technology}
                      onClick={() => setTechnology(null)}
                    >
                      All
                    </FilterChip>
                    {technologies.map((t) => (
                      <FilterChip
                        key={t}
                        active={technology === t}
                        onClick={() =>
                          setTechnology(technology === t ? null : t)
                        }
                      >
                        {t}
                      </FilterChip>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>
                  Showing {filtered.length} of {allProjects.length} projects
                </span>
                {hasFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCategory(null);
                      setTechnology(null);
                    }}
                  >
                    <X className="h-4 w-4" /> Clear filters
                  </Button>
                )}
              </div>
            </div>

            {/* Projects Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                No projects match these filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((project) => (
                  <SingleProject key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
      </div>
    </div>
  );
}
