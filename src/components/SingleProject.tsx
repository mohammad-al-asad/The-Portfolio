"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "./ui/button";
import { projects } from "../../generated/prisma";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { getProjectLinks, linkMeta } from "@/lib/project";
import { edgeColor, tagsThatFit } from "@/lib/edgeColor";

function SingleProject({ project }: { project: projects }) {
  const href = `/projects/${project.id}`;
  const links = getProjectLinks(project);
  const tags = tagsThatFit(project.tags);
  const hiddenTags = project.tags.length - tags.length;
  // Fill around the (uncropped) image with the colour of its own edges
  const [imageBg, setImageBg] = useState<string | null>(null);
  return (
    <Card className="relative bg-white py-0 dark:bg-card/70 border border-gray-200 dark:border-white/10 hover:border-purple-500 dark:hover:border-purple-400 transition-colors duration-300 shadow-sm dark:shadow-none group">
      <div className="px-3 pt-4">
        <div
          className="relative w-full h-56 overflow-hidden rounded-lg border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-card transition-colors duration-300"
          style={imageBg ? { backgroundColor: imageBg } : undefined}
        >
          <Image
            priority
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-contain"
            onLoad={(e) => setImageBg(edgeColor(e.currentTarget))}
          />
        </div>
      </div>
      <CardContent className="px-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-foreground mb-2">
          {/* Stretched link makes the whole card clickable */}
          <Link href={href} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
        <p className="text-gray-700 dark:text-foreground/80 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-nowrap gap-2 mt-4 overflow-hidden" title={project.tags.join(", ")}>
          {tags.map((tag, i) => (
            <Badge
              key={i}
              variant="outline"
              className="min-w-0 truncate bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-foreground/80 border-gray-300 dark:border-white/15 text-xs"
            >
              {tag}
            </Badge>
          ))}
          {hiddenTags > 0 && (
            <Badge
              variant="outline"
              className="shrink-0 text-xs border-gray-300 dark:border-white/15"
            >
              +{hiddenTags}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 gap-2">
        <Button
          asChild
          variant="outline"
          className="relative z-10 flex-1 border-gray-300 dark:border-white/15"
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
              className="relative z-10 shrink-0 border-gray-300 dark:border-white/15"
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
      </CardFooter>
    </Card>
  );
}

export default SingleProject;
