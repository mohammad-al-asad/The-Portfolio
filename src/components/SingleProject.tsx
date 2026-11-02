"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "../../generated/prisma";
import { getProjectLinks, linkMeta } from "@/lib/project";
import { edgeColor, tagsThatFit } from "@/lib/edgeColor";

// Framed screenshot on top, title with an arrow that turns on hover, short
// summary, tags as small mono labels, then View Details and the link buttons.
// The whole card opens the project.
function SingleProject({ project }: { project: projects }) {
  const href = `/projects/${project.id}`;
  const links = getProjectLinks(project);
  const tags = tagsThatFit(project.tags);
  const hiddenTags = project.tags.length - tags.length;
  // Fill around the (uncropped) image with the colour of its own edges
  const [imageBg, setImageBg] = useState<string | null>(null);

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/70 hover:shadow-xl hover:shadow-purple-500/10 dark:border-gray-800 dark:bg-gray-900/60 dark:shadow-none dark:hover:border-purple-400/50">
      {/* 16:9, the same shape as every project image, so nothing is letterboxed */}
      <div
        className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100 transition-colors duration-300 dark:bg-gray-800"
        style={imageBg ? { backgroundColor: imageBg } : undefined}
      >
        <Image
          priority
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          onLoad={(e) => setImageBg(edgeColor(e.currentTarget))}
        />

      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug text-gray-900 dark:text-white">
            {/* Stretched link makes the whole card clickable */}
            <Link href={href} className="after:absolute after:inset-0 after:rounded-2xl">
              {project.title}
            </Link>
          </h3>
          <span
            aria-hidden
            className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-gray-200 text-gray-500 transition-all duration-300 group-hover:rotate-45 dark:border-gray-700 dark:text-gray-400"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {project.description}
        </p>

        {tags.length > 0 && (
          <div
            className="mt-auto flex flex-nowrap gap-x-3 overflow-hidden pt-4 font-mono text-xs text-gray-500 dark:text-gray-400"
            title={project.tags.join(", ")}
          >
            {tags.map((tag, i) => (
              <span key={i} className="min-w-0 truncate">
                <span className="text-purple-500 dark:text-purple-400">#</span>
                {tag}
              </span>
            ))}
            {hiddenTags > 0 && <span className="shrink-0">+{hiddenTags}</span>}
          </div>
        )}

        {/* Same footer as before: View Details, then an icon button per link */}
        <div className="mt-4 flex gap-2">
          <Button
            asChild
            variant="outline"
            className="relative z-10 flex-1 border-gray-300 dark:border-gray-600"
          >
            <Link href={href}>
              <ExternalLink className="h-4 w-4" />
              View Details
            </Link>
          </Button>
          {links.map((link, i) => {
            const { label, icon: Icon } = linkMeta(link.type);
            const name = link.label || label;
            return (
              <Button
                key={i}
                asChild
                variant="outline"
                size="icon"
                className="relative z-10 shrink-0 border-gray-300 dark:border-gray-600"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={name}
                  aria-label={`${name} for ${project.title}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              </Button>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default SingleProject;
