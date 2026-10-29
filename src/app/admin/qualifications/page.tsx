"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEdgeStore } from "@/lib/edgestore";
import PageHeader from "@/components/PageHeader";
import { achievements, educations } from "../../../../generated/prisma";
import AdminEducationTable from "@/components/AdminEducationTable";
import AdminAchievementTable from "@/components/AdminAchievementTable";

type Tab = "education" | "achievement";

export default function AdminQualificationsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const [activeTab, setActiveTab] = useState<Tab>("education");
  const [educations, setEducations] = useState<educations[]>([]);
  const [achievements, setAchievements] = useState<achievements[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    if (tab === "education" || tab === "achievement") setActiveTab(tab);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eduRes, achRes] = await Promise.all([
        fetch("/api/educations"),
        fetch("/api/achievements"),
      ]);
      if (eduRes.ok && achRes.ok) {
        const [eduData, achData] = await Promise.all([
          eduRes.json(),
          achRes.json(),
        ]);
        setEducations(eduData);
        setAchievements(achData);
      }
    } catch (error) {
      console.error("Error fetching qualifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Deletes the record and its certificate image
  const deleteItem = async (
    resource: "educations" | "achievements",
    id: string
  ) => {
    if (!session) {
      return router.push("/admin/login");
    }
    const label = resource === "educations" ? "education" : "achievement";
    if (!confirm(`Are you sure you want to delete this ${label}?`)) return;
    try {
      const itemResponse = await fetch(`/api/${resource}/${id}`);
      if (itemResponse.ok) {
        const item = await itemResponse.json();
        if (item.imagePath) {
          await edgestore.qualificationImages.delete({ url: item.imageUrl });
        }
        const deleteResponse = await fetch(`/api/${resource}/${id}`, {
          method: "DELETE",
        });
        if (deleteResponse.ok) await fetchData();
        else console.error(`Failed to delete ${label}`);
      }
    } catch (error) {
      console.error(`Error deleting ${label}:`, error);
    }
  };

  const newHref =
    activeTab === "education"
      ? "/admin/educations/new"
      : "/admin/achievements/new";

  return (
    <div className="container mx-auto">
      <PageHeader>
        <div className="flex justify-between items-center md:px-16 px-6 py-3.5 bg-gradient-to-r from-blue-400/15 to-purple-600/15 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white [word-spacing:3px]">
            Manage Qualifications
          </h1>
          <Button asChild>
            <Link href={newHref}>
              <Plus className="h-4 w-4" />
              Add {activeTab === "education" ? "Education" : "Achievement"}
            </Link>
          </Button>
        </div>
      </PageHeader>

      {/* Tabs for Education / Achievement */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Tab)}>
        <TabsList className="mt-6 mx-auto flex justify-center">
          <TabsTrigger value="education">Educations</TabsTrigger>
          <TabsTrigger value="achievement">Achievements</TabsTrigger>
        </TabsList>
        <TabsContent value="education">
          <AdminEducationTable
            loading={loading}
            educations={educations}
            handleDelete={(id) => deleteItem("educations", id)}
            handleEdit={(education) =>
              router.push(`/admin/educations/${education.id}/edit`)
            }
          />
        </TabsContent>

        <TabsContent value="achievement">
          <AdminAchievementTable
            loading={loading}
            achievements={achievements}
            handleDelete={(id) => deleteItem("achievements", id)}
            handleEdit={(achievement) =>
              router.push(`/admin/achievements/${achievement.id}/edit`)
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
