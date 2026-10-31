import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { ArrowRight } from "lucide-react";
import { projects } from "../../generated/prisma";
import SingleProject from "./SingleProject";

export default function FeaturedProjects({ projects }: { projects: projects[] }) {
  return (
    <section id="projects">
      <SectionHeader
        title="Featured Projects"
        subtitle="A few things I've built and shipped recently"
        action={
          <Button asChild variant="outline" className="dark:border-white/10">
            <Link href="/projects">
              View All Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {projects.map((project) => (
          <SingleProject key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
