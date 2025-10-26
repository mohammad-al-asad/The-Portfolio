"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { ArrowRight } from "lucide-react";

import { useEffect, useState } from "react";
import { projects } from "../../generated/prisma";
import SingleProject from "./SingleProject";
import LoadingScreen from "./LoadingScreen";

export default function FeaturedProjects() {
  const [featuredProjects, setFeaturedProjects] = useState<projects[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch("api/projects/featured");
        if (res.ok) {
          const featuredProjects = await res.json();
          setFeaturedProjects(featuredProjects);
        } else {
          throw new Error("Failed to fetch");
        }
      } catch (error) {
        console.log("Failed to fetch", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
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
        {featuredProjects?.map((project) => (
          <SingleProject key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
