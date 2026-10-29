import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "./ui/button";
import { projects } from "../../generated/prisma";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { getProjectLinks, linkMeta } from "@/lib/project";

function SingleProject({ project }: { project: projects }) {
  const href = `/projects/${project.id}`;
  const links = getProjectLinks(project);
  return (
    <Card className="relative bg-white py-0 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-colors duration-300 shadow-sm dark:shadow-none group">
      <div className="px-3 pt-4">
        <div className="relative w-full h-56 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          <Image
            priority
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover object-top"
          />
        </div>
      </div>
      <CardContent className="px-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {/* Stretched link makes the whole card clickable */}
          <Link href={href} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
        <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.slice(0, 3).map((tag, i) => (
            <Badge
              key={i}
              variant="outline"
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 text-xs"
            >
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge
              variant="outline"
              className="text-xs border-gray-300 dark:border-gray-600"
            >
              +{project.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 gap-2">
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
      </CardFooter>
    </Card>
  );
}

export default SingleProject;
