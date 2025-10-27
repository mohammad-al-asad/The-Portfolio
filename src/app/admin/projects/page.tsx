"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
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
  const [featureInput, setFeatureInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema) as Resolver<ProjectFormData>,
    defaultValues: {
      title: "",
      description: "",
      detailedDescription: "",
      categoryId: "",
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

  // redirect non-admins
  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  // fetch projects
  useEffect(() => {
    if (session?.user.role === "admin") {
      fetchProjects();
    }
  }, [session]);

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

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const url = editingProject
        ? `/api/projects/${editingProject.id}`
        : "/api/projects";
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        await fetchProjects();
        resetForm();
        setIsDialogOpen(false);
      } else {
        const err = await res.json();
        console.error("Failed to save project:", err);
      }
    } catch (err) {
      console.error("Error saving project:", err);
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
      categoryId: project.categoryId ?? "",
      imageUrl: project.imageUrl ?? "",
      imagePath: project.imagePath ?? "",
      liveUrl: project.liveUrl ?? "",
      githubUrl: project.githubUrl ?? "",
      completionDate: project.completionDate ?? "",
      teamSize: project.teamSize ?? "",
      featured: project.featured ?? false,
    });
    setTagInput("");
    setTechInput("");
    setFeatureInput("");
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
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

  const removeImage = async () => {
    const imagePath = form.getValues("imagePath");
    
    if (imagePath) {
      try {
        await edgestore.projectImages.delete({
          url: form.getValues("imageUrl"),
        });
      } catch (err) {
        console.error("Error deleting image:", err);
      }
    }
    form.setValue("imageUrl", "");
    form.setValue("imagePath", "");
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    const current = form.getValues("tags");
    if (!current.includes(tagInput.trim())) {
      form.setValue("tags", [...current, tagInput.trim()], {
        shouldValidate: true,
      });
      setTagInput("");
    }
  };
  const removeTag = (t: string) => {
    const current = form.getValues("tags");
    form.setValue(
      "tags",
      current.filter((x) => x !== t),
      { shouldValidate: true }
    );
  };

  const addTechnology = () => {
    if (!techInput.trim()) return;
    const current = form.getValues("technologies");
    if (!current.includes(techInput.trim())) {
      form.setValue("technologies", [...current, techInput.trim()], {
        shouldValidate: true,
      });
      setTechInput("");
    }
  };
  const removeTechnology = (t: string) => {
    const current = form.getValues("technologies");
    form.setValue(
      "technologies",
      current.filter((x) => x !== t),
      { shouldValidate: true }
    );
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    const current = form.getValues("features");
    if (current && !current.includes(featureInput.trim())) {
      form.setValue("features", [...current, featureInput.trim()], {
        shouldValidate: true,
      });
      setFeatureInput("");
    }
  };
  const removeFeature = (f: string) => {
    const current = form.getValues("features");

    form.setValue(
      "features",
      current?.filter((x) => x !== f),
      { shouldValidate: true }
    );
  };

  const resetForm = () => {
    form.reset({
      title: "",
      description: "",
      detailedDescription: "",
      categoryId: "",
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
    });
    setEditingProject(null);
    setTagInput("");
    setTechInput("");
    setFeatureInput("");
  };

  if (!session || session.user.role !== "admin") return null;

  return (
    <div className="container mx-auto">
      <PageHeader>
        <div className="flex justify-between items-center md:px-16 px-6 py-3.5 bg-gradient-to-r from-blue-400/15 to-purple-600/15 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
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
                        rows={3}
                        placeholder="Short description..."
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
                        rows={4}
                        placeholder="Detailed info..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Category ID..."
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

              <FormField
                control={form.control}
                name="liveUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live URL</FormLabel>
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
                    <FormLabel>GitHub URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/user/repo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="teamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Size</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 3 developers" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tags */}
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
                      {field.value.map((tag, i) => (
                        <Badge key={i} className="flex items-center gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="p-1 rounded-full hover:bg-black/20 cursor-pointer"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          {/* <X className="h-3 w-3 cursor-pointer z-50"  /> */}
                        </Badge>
                      ))}
                    </div>
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
                      {field.value.map((tech, i) => (
                        <Badge key={i} className="flex items-center gap-1">
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTechnology(tech)}
                            className="p-1 rounded-full hover:bg-black/20 cursor-pointer"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </FormItem>
                )}
              />

              {/* Features */}
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Features</FormLabel>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addFeature();
                          }
                        }}
                        placeholder="Enter a feature and press Add"
                      />
                      <Button type="button" onClick={addFeature}>
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {field.value?.map((f, i) => (
                        <Badge key={i} className="flex items-center gap-1">
                          {f}
                          <button
                            type="button"
                            onClick={() => removeFeature(f)}
                            className="p-1 rounded-full hover:bg-black/20 cursor-pointer"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3 border p-4 rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div>
                      <FormLabel>Featured Project</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Show this project on homepage highlights.
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
