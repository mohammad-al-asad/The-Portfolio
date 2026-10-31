"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEdgeStore } from "@/lib/edgestore";
import AdminProjectTable from "@/components/AdminProjectTable";
import { projects } from "../../../../generated/prisma";
import PageHeader from "@/components/PageHeader";

export default function AdminProjectsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const [projects, setProjects] = useState<projects[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else console.error("Failed to fetch projects");
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: projects) => {
    router.push(`/admin/projects/${project.id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (!session) {
      return router.push("/admin/login");
    }
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const projectRes = await fetch(`/api/projects/${id}`);
      if (projectRes.ok) {
        const project = await projectRes.json();
        if (project.imagePath) {
          await edgestore.projectImages.delete({ url: project.imageUrl });
        }
        const del = await fetch(`/api/projects/${id}`, { method: "DELETE" });
        if (del.ok) fetchProjects();
        else console.error("Failed to delete project");
      }
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <div className="page-container">
      <PageHeader>
        <div className="flex justify-between items-center md:px-16 px-6 py-3.5 bg-gradient-to-r from-blue-400/15 to-purple-600/15 dark:from-blue-500/10 dark:to-purple-600/10 border border-gray-200 dark:border-white/10">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-foreground">
            Manage Projects
          </h1>
          <Button asChild>
            <Link href="/admin/projects/new">
              <Plus className="h-4 w-4" />
              Add <span className="hidden md:block">New Project</span>
            </Link>
          </Button>
        </div>
      </PageHeader>

      <AdminProjectTable
        loading={loading}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        projects={projects}
      />
    </div>
  );
}
