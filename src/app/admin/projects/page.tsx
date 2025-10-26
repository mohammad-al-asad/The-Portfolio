"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { EdgestoreUploader } from "@/components/EdgestoreUploader";
import { Plus, Save, X } from "lucide-react";
import { projectSchema, type ProjectFormData } from "@/lib/validations/project";
import { useEdgeStore } from "@/lib/edgestore";
import AdminProjectTable from "@/components/AdminProjectTable";
import { projects } from "../../../../generated/prisma";
import PageHeader from "@/components/PageHeader";

export default function AdminProjectsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const [projects, setProjects] = useState<projects[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<projects | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [techInput, setTechInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addTechnology = () => {
    if (techInput.trim()) {
      const currentTechs = form.getValues("technologies");
      if (!currentTechs.includes(techInput.trim())) {
        form.setValue("technologies", [...currentTechs, techInput.trim()], {
          shouldValidate: true,
        });
        setTechInput("");
      }
    }
  };

  const removeTechnology = (techToRemove: string) => {
    const currentTechs = form.getValues("technologies");
    form.setValue(
      "technologies",
      currentTechs.filter((tech) => tech !== techToRemove),
      { shouldValidate: true }
    );
  };

  // Initialize form
  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      detailedDescription: "",
      imageUrl: "",
      imagePath: "",
      tags: [],
      technologies: [],
      features: [],
      liveUrl: "",
      githubUrl: "",
      completionDate: "",
      teamSize: "",
      featured: false,
    },
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  // Fetch projects
  useEffect(() => {
    if (session?.user.role === "admin") {
      fetchProjects();
    }
  }, [session]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const url = editingProject
        ? `/api/projects/${editingProject.id}`
        : "/api/projects";

      const method = editingProject ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchProjects();
        resetForm();
        setIsDialogOpen(false);
      } else {
        const errorData = await response.json();
        console.error("Failed to save project:", errorData);
      }
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleEdit = (project: projects) => {
    setEditingProject(project);

    form.reset({
      title: project.title ?? "",
      description: project.description ?? "",
      detailedDescription: project.detailedDescription ?? "",
      tags: project.tags ?? [],
      technologies: project.technologies ?? [],
      features: project.features ?? [],
      imageUrl: project.imageUrl ?? "",
      imagePath: project.imagePath ?? "",
      liveUrl: project.liveUrl ?? "",
      githubUrl: project.githubUrl ?? "",
      completionDate: project.completionDate ?? "",
      teamSize: project.teamSize ?? "",
      featured: project.featured ?? false,
    });

    // reset temporary input fields
    setTagInput("");
    setTechInput("");
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        // First get the project to get the image path
        const projectResponse = await fetch(`/api/projects/${id}`);
        if (projectResponse.ok) {
          const project = await projectResponse.json();

          // Delete the image from Edgestore
          if (project.imagePath) {
            await edgestore.projectImages.delete({
              url: project.imageUrl,
            });
          }

          // Then delete the project from the database
          const deleteResponse = await fetch(`/api/projects/${id}`, {
            method: "DELETE",
          });

          if (deleteResponse.ok) {
            await fetchProjects();
          } else {
            console.error("Failed to delete project");
          }
        }
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const removeImage = async () => {
    const imagePath = form.getValues("imagePath");
    if (imagePath) {
      try {
        await edgestore.projectImages.delete({
          url: form.getValues("imageUrl"),
        });
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }

    form.setValue("imageUrl", "");
    form.setValue("imagePath", "");
  };

  const addTag = () => {
    if (tagInput.trim()) {
      const currentTags = form.getValues("tags");
      if (!currentTags.includes(tagInput.trim())) {
        form.setValue("tags", [...currentTags, tagInput.trim()], {
          shouldValidate: true,
        });
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags");
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove),
      {
        shouldValidate: true,
      }
    );
  };

  const resetForm = () => {
    form.reset({
      title: "",
      description: "",
      detailedDescription: "",
      tags: [],
      technologies: [],
      features: [],
      imageUrl: "",
      imagePath: "",
      liveUrl: "",
      githubUrl: "",
      completionDate: "",
      teamSize: "",
      featured: false,
    });

    setEditingProject(null);
    setTagInput("");
    setTechInput("");
  };

  if (!session || session.user.role !== "admin") {
    return null;
  }

  return (
    <div className="container mx-auto">
      <PageHeader>
        <div className="flex justify-between items-center md:px-16 px-6 py-3.5 bg-gradient-to-r from-blue-400/15 to-purple-600/15 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
          <h1 className="text-xl [word-spacing:3px] md:text-2xl flex gap-3 font-bold text-gray-900 dark:text-white">
            Manage Projects
          </h1>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="md:mr-2 h-4 w-4" />
            Add <span className="hidden md:block">New Project</span>
          </Button>
        </div>
      </PageHeader>

      <AdminProjectTable
        loading={loading}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        projects={projects}
      />

      {/* Add/Edit Project Dialog */}
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
              {editingProject ? "Edit Project" : "Add New Project"}
            </DialogTitle>
            <DialogDescription>
              {editingProject
                ? "Update the project details below."
                : "Fill in the details for your new project."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Project description"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="detailedDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a detailed explanation..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Image</FormLabel>
                    <FormControl>
                      <EdgestoreUploader
                        value={field.value}
                        onChange={(url, path) => {
                          field.onChange(url);
                          form.setValue("imagePath", path);
                        }}
                        onRemove={removeImage}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Hidden field for imagePath */}
              <FormField
                control={form.control}
                name="imagePath"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="liveUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub URL (optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username/repo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Completion Date */}
              <FormField
                control={form.control}
                name="completionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Completion Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Team Size */}
              <FormField
                control={form.control}
                name="teamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Size</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 4 developers" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                        placeholder="Enter a tag and press Add"
                      />
                      <Button type="button" onClick={addTag}>
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((tag, index) => (
                        <Badge key={index} className="flex items-center gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 rounded-full hover:bg-black/20"
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

              {/* Technologies */}
              <FormField
                control={form.control}
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
                            addTechnology();
                          }
                        }}
                        placeholder="Enter a technology and press Add"
                      />
                      <Button type="button" onClick={addTechnology}>
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((tech, index) => (
                        <Badge key={index} className="flex items-center gap-1">
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTechnology(tech)}
                            className="ml-1 rounded-full hover:bg-black/20"
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

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured Project</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Feature this project on the homepage
                      </p>
                    </div>
                  </FormItem>
                )}
              />

                <Button type="submit" className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  {editingProject ? "Update Project" : "Create Project"}
                </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
