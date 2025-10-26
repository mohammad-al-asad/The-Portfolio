"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Save, Plus, X } from "lucide-react";
import { EdgestoreUploader } from "@/components/EdgestoreUploader";
import { useEdgeStore } from "@/lib/edgestore";
import {
  educationSchema,
  type EducationFormData,
  achievementSchema,
  type AchievementFormData,
} from "@/lib/validations/qualifications";
import PageHeader from "@/components/PageHeader";
import { achievements, educations } from "../../../../generated/prisma";
import { Textarea } from "@/components/ui/textarea";
import AdminEducationTable from "@/components/AdminEducationTable";
import AdminAchievementTable from "@/components/AdminAchievementTable";

export default function AdminQualificationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  // UI states
  const [activeTab, setActiveTab] = useState<string>("education");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Data states
  const [educations, setEducations] = useState<educations[]>([]);
  const [achievements, setAchievements] = useState<achievements[]>([]);
  const [editingItem, setEditingItem] = useState<
    educations | null | achievements
  >(null);
  const [loading, setLoading] = useState(true);
  const [techInput, setTechInput] = useState("");
  const [courseInput, setCourseInput] = useState("");

  // Forms
  const educationForm = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: "",
      degree: "",
      period: "",
      location: "",
      description: "",
      detailedDescription: "",
      gpa: "",
      courses: [],
      imageUrl: "",
      imagePath: "",
    },
  });

  const achievementForm = useForm<AchievementFormData>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      title: "",
      organization: "",
      year: "",
      description: "",
      detailedDescription: "",
      technologies: [],
      imageUrl: "",
      imagePath: "",
    },
  });

  // Redirect if not admin
  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  // Fetch existing data
  useEffect(() => {
    if (session?.user.role === "admin") {
      fetchData();
    }
  }, [session]);

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

  // Add/Remove Helpers
  const addItem = (type: string) => {
    setEditingItem(null);
    setIsDialogOpen(true);
    setActiveTab(type);
    if (type === "education") educationForm.reset();
    else achievementForm.reset();
  };

  const addCourse = () => {
    if (courseInput.trim()) {
      const current = educationForm.getValues("courses");
      if (!current.includes(courseInput.trim())) {
        educationForm.setValue("courses", [...current, courseInput.trim()]);
      }
      setCourseInput("");
    }
  };

  const removeCourse = (course: string) => {
    const current = educationForm.getValues("courses");
    educationForm.setValue(
      "courses",
      current.filter((c) => c !== course)
    );
  };

  const addTech = () => {
    if (techInput.trim()) {
      const current = achievementForm.getValues("technologies");
      if (!current.includes(techInput.trim())) {
        achievementForm.setValue("technologies", [
          ...current,
          techInput.trim(),
        ]);
      }
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    const current = achievementForm.getValues("technologies");
    achievementForm.setValue(
      "technologies",
      current.filter((t: string) => t !== tech)
    );
  };

  const removeImage = async () => {
    const imagePath = achievementForm.getValues("imagePath");
    if (imagePath) {
      try {
        await edgestore.qualificationImages.delete({
          url: achievementForm.getValues("imageUrl"),
        });
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }

    achievementForm.setValue("imageUrl", "");
    achievementForm.setValue("imagePath", "");
  };

  const resetForm = () => {
    achievementForm.reset({
      title: "",
      organization: "",
      year: "",
      description: "",
      detailedDescription: "",
      imageUrl: "",
      imagePath: "",
      technologies: [],
    });
    educationForm.reset({
      institution: "",
      degree: "",
      period: "",
      location: "",
      description: "",
      detailedDescription: "",
      gpa: "",
      courses: [],
      imageUrl: "",
      imagePath: "",
    });
  };

  // Handle Delete for Education
  const handleEducationDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this education?")) {
      try {
        // First get the education to get the image path
        const educationResponse = await fetch(`/api/educations/${id}`);
        if (educationResponse.ok) {
          const education = await educationResponse.json();

          // Delete the image from Edgestore if exists
          if (education.imagePath) {
            await edgestore.qualificationImages.delete({
              url: education.imageUrl,
            });
          }

          // Then delete the education from the database
          const deleteResponse = await fetch(`/api/educations/${id}`, {
            method: "DELETE",
          });

          if (deleteResponse.ok) {
            await fetchData(); // fetchEducations replaces fetchProjects
          } else {
            console.error("Failed to delete education");
          }
        }
      } catch (error) {
        console.error("Error deleting education:", error);
      }
    }
  };

  // Handle Edit for Education
  const handleEducationEdit = (education: educations) => {
    setEditingItem(education); // editingEducation replaces editingProject

    educationForm.reset({
      institution: education.institution ?? "",
      degree: education.degree ?? "",
      period: education.period ?? "",
      location: education.location ?? "",
      description: education.description ?? "",
      detailedDescription: education.detailedDescription ?? "",
      gpa: education.gpa ?? "",
      courses: education.courses ?? [],
      imageUrl: education.imageUrl ?? "",
      imagePath: education.imagePath ?? "",
    });

    // reset temporary input fields
    setCourseInput("");
    setIsDialogOpen(true);
  };

  // Handle Delete for Achievement
  const handleAchievementDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this achievement?")) {
      try {
        // First get the achievement to get the image path
        const achievementResponse = await fetch(`/api/achievements/${id}`);
        if (achievementResponse.ok) {
          const achievement = await achievementResponse.json();

          // Delete the image from Edgestore if exists
          if (achievement.imagePath) {
            await edgestore.qualificationImages.delete({
              url: achievement.imageUrl,
            });
          }

          // Then delete the achievement from the database
          const deleteResponse = await fetch(`/api/achievements/${id}`, {
            method: "DELETE",
          });

          if (deleteResponse.ok) {
            await fetchData(); // fetchAchievements replaces fetchData
          } else {
            console.error("Failed to delete achievement");
          }
        }
      } catch (error) {
        console.error("Error deleting achievement:", error);
      }
    }
  };

  // Handle Edit for Achievement
  const handleAchievementEdit = (achievement: achievements) => {
    setEditingItem(achievement); // editingAchievement replaces editingItem

    achievementForm.reset({
      title: achievement.title ?? "",
      organization: achievement.organization ?? "",
      year: achievement.year ?? "",
      description: achievement.description ?? "",
      detailedDescription: achievement.detailedDescription ?? "",
      imageUrl: achievement.imageUrl ?? "",
      imagePath: achievement.imagePath ?? "",
      technologies: achievement.technologies ?? [],
    });

    // reset temporary input fields
    setTechInput("");
    setIsDialogOpen(true);
  };

  // Submit Edducation handlers
  const onEducationSubmit = async (data: EducationFormData) => {
    try {
      const url = editingItem
        ? `/api/educations/${editingItem.id}`
        : "/api/educations";
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        await fetchData();
        resetForm();
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error saving education:", error);
    }
  };

  // Submit Achievement handlers
  const onAchievementSubmit = async (data: AchievementFormData) => {
    try {
      const url = editingItem
        ? `/api/achievements/${editingItem.id}`
        : "/api/achievements";
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        await fetchData();
        resetForm();
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error saving achievement:", error);
    }
  };

  if (!session || session.user.role !== "admin") return null;

  return (
    <div className="container mx-auto">
      <PageHeader>
        <div className="flex justify-between items-center md:px-16 px-6 py-3.5 bg-gradient-to-r from-blue-400/15 to-purple-600/15 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white [word-spacing:3px]">
            Manage Qualifications
          </h1>
          <Button onClick={() => addItem(activeTab)}>
            <Plus className="md:mr-2 h-4 w-4" />
            Add New {activeTab === "education" ? "Education" : "Achievement"}
          </Button>
        </div>
      </PageHeader>

      {/* Tabs for Education / Achievement */}
      <Tabs
        defaultValue="education"
        onValueChange={(v) => setActiveTab(v as string)}
      >
        <TabsList className="mt-6 mx-auto flex justify-center">
          <TabsTrigger value="education">Educations</TabsTrigger>
          <TabsTrigger value="achievement">Achievements</TabsTrigger>
        </TabsList>
        <TabsContent value="education">
          <AdminEducationTable
            loading={loading}
            educations={educations}
            handleDelete={handleEducationDelete}
            handleEdit={handleEducationEdit}
          />
        </TabsContent>

        <TabsContent value="achievement">
          <AdminAchievementTable
            loading={loading}
            achievements={achievements}
            handleDelete={handleAchievementDelete}
            handleEdit={handleAchievementEdit}
          />
        </TabsContent>
      </Tabs>

      {/* Add/Edit Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
          <DialogHeader>
            <DialogTitle>
              {editingItem
                ? `Edit ${
                    activeTab === "education" ? "Education" : "Achievement"
                  }`
                : `Add New ${
                    activeTab === "education" ? "Education" : "Achievement"
                  }`}
            </DialogTitle>
          </DialogHeader>

          {activeTab === "education" ? (
            <Form {...educationForm}>
              <form
                onSubmit={educationForm.handleSubmit(onEducationSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={educationForm.control}
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Stanford University"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={educationForm.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Bachelor of Science"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image */}
                <FormField
                  control={educationForm.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate Image</FormLabel>
                      <FormControl>
                        <EdgestoreUploader
                          value={field.value}
                          onChange={(url, path) => {
                            field.onChange(url);
                            educationForm.setValue("imagePath", path);
                          }}
                          onRemove={removeImage}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={educationForm.control}
                  name="period"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Period</FormLabel>
                      <FormControl>
                        <Input placeholder="2018 - 2022" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Location */}
                <FormField
                  control={educationForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City, Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={educationForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of the education/achievement"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Detailed Description */}
                <FormField
                  control={educationForm.control}
                  name="detailedDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detailed Description (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide more detailed information..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* GPA */}
                <FormField
                  control={educationForm.control}
                  name="gpa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GPA (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 3.75 / 4.0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Course */}
                <FormField
                  control={educationForm.control}
                  name="courses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Courses</FormLabel>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={courseInput}
                          onChange={(e) => setCourseInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addCourse();
                            }
                          }}
                        />
                        <Button type="button" onClick={addCourse}>
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {field.value.map((c, i) => (
                          <Badge key={i} className="flex items-center gap-1">
                            {c}
                            <button
                              type="button"
                              onClick={() => removeCourse(c)}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full mt-4">
                  <Save className="mr-2 h-4 w-4" />
                  Save Education
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...achievementForm}>
              <form
                onSubmit={achievementForm.handleSubmit(onAchievementSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={achievementForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Google Developer Winner"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={achievementForm.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Google LLC" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={achievementForm.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate Image</FormLabel>
                      <FormControl>
                        <EdgestoreUploader
                          value={field.value}
                          onChange={(url, path) => {
                            field.onChange(url);
                            achievementForm.setValue("imagePath", path);
                          }}
                          onRemove={removeImage}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Year */}
                <FormField
                  control={achievementForm.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2022" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={achievementForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of the achievement"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Detailed Description */}
                <FormField
                  control={achievementForm.control}
                  name="detailedDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detailed Description (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide more detailed information..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={achievementForm.control}
                  name="technologies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technologies</FormLabel>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={techInput}
                          onChange={(e) => setTechInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTech();
                            }
                          }}
                        />
                        <Button type="button" onClick={addTech}>
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {field.value.map((t, i) => (
                          <Badge key={i} className="flex items-center gap-1">
                            {t}
                            <button type="button" onClick={() => removeTech(t)}>
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full mt-4">
                  <Save className="mr-2 h-4 w-4" />
                  Save Achievement
                </Button>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
