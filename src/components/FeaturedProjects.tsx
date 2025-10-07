// src/components/featured-projects.tsx
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/SectionHeader";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import Image from "next/image";

// Using the same project data as in the projects page
const featuredProjects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A full-featured online shopping platform with payment integration and inventory management.",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
    liveUrl: "https://ecommerce-demo.example.com",
    githubUrl: "https://github.com/example/ecommerce",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A productivity application for teams to collaborate on projects and tasks.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Socket.io"],
    liveUrl: "https://taskmanager.example.com",
    githubUrl: "https://github.com/example/task-manager",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "Real-time weather forecasting application with interactive maps and location tracking.",
    tags: ["React", "API Integration", "Chart.js", "Leaflet", "Geolocation"],
    liveUrl: "https://weather-dashboard.example.com",
    githubUrl: "https://github.com/example/weather-dashboard",
  },
];

export default function FeaturedProjects() {
  return (
    <section id="projects">
      <SectionHeader
        title="Featured Projects"
        subtitle="My recent work"
        action={
          <Button asChild variant="outline" className="dark:border-gray-700">
            <Link href="/projects">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {featuredProjects.map((project) => (
          <Card
            key={project.id}
            className="bg-white py-0 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-colors duration-300 shadow-sm dark:shadow-none group flex justify-between"
          >
            <div className="p-6 pb-0">
              <div className="relative w-full h-56 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                <Image src="/diceGame.png" alt={project.title} fill />
              </div>
            </div>
            <CardContent className="px-6 py-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.slice(0, 3).map((tag, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                  >
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 3 && (
                  <Badge
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600"
                  >
                    +{project.tags.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between px-6 pb-6 pt-0">
              <Button
                variant="outline"
                className="dark:border-gray-700"
                asChild
              >
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" /> Code
                </a>
              </Button>
              <Button asChild>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
