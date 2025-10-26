"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { projects } from "../../../generated/prisma";
import SingleProject from "@/components/SingleProject";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState<projects[]>();

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch("api/projects");
        if (res.ok) {
          const allprojects = await res.json();
          setAllProjects(allprojects);
        } else {
          throw new Error("Failed to fetch");
        }
      } catch (error) {
        console.log("Failed to fetch", error);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        {/* Header - With Gradient Accent */}
        <PageHeader>
          <div className="flex py-4 px-6 md:px-16 gap-4 bg-gradient-to-r from-blue-400/15 to-purple-600/15 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
            <Link href="/">
              <Button
                variant="outline"
                className="flex items-center border-gray-300 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl self-center md:text-2xl [word-spacing:3px] font-bold text-gray-900 dark:text-white">
              Project Gallery
            </h1>
          </div>
        </PageHeader>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[20%] md:mt-[15%] p-3">
          {allProjects?.map((project) => (
            <SingleProject key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
