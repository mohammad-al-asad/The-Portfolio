"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import ProjectImagesField, { type GalleryImage } from "@/components/ProjectImagesField";
import { Check, Plus, Trash2, X } from "lucide-react";
import { projectSchema, type ProjectFormData } from "@/lib/validations/project";
import { useEdgeStore } from "@/lib/edgestore";
import { categories, projects } from "../../generated/prisma";
import {
  LINK_META,
  LINK_TYPES,
  getProjectCategoryIds,
  getProjectImages,
  getProjectLinks,
  type LinkType,
} from "@/lib/project";
import EditorLayout, { FormSection } from "@/components/EditorLayout";

const toLinkType = (type: string): LinkType =>
  (LINK_TYPES as readonly string[]).includes(type) ? (type as LinkType) : "other";

export default function ProjectForm({ project }: { project?: projects }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const [tagInput, setTagInput] = useState("");
  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [allCategories, setAllCategories] = useState<categories[]>([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => (res.ok ? res.json() : []))
      .then(setAllCategories)
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema) as Resolver<ProjectFormData>,
    defaultValues: {
      title: project?.title ?? "",
      description: project?.description ?? "",
      detailedDescription: project?.detailedDescription ?? "",
      categoryIds: project ? getProjectCategoryIds(project) : [],
      imageUrl: project?.imageUrl ?? "",
      imagePath: project?.imagePath ?? "",
      images: project ? getProjectImages(project) : [],
      tags: project?.tags ?? [],
      technologies: project?.technologies ?? [],
      features: project?.features ?? [],
      links: project
        ? getProjectLinks(project).map((l) => ({
            type: toLinkType(l.type),
            label: l.label ?? "",
            url: l.url,
          }))
        : [{ type: "live", label: "", url: "" }],
      completionDate: project?.completionDate ?? "",
      teamSize: project?.teamSize ?? "",
      featured: project?.featured ?? false,
    },
  });

  const links = useFieldArray({ control: form.control, name: "links" });

  const toggleCategory = (id: string) => {
    const current = form.getValues("categoryIds");
    form.setValue(
      "categoryIds",
      current.includes(id) ? current.filter((c) => c !== id) : [...current, id],
      { shouldValidate: true }
    );
  };

  const createCategory = async () => {
    const name = categoryInput.trim();
    if (!name) return;
    const existing = allCategories.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
    if (existing) {
      if (!form.getValues("categoryIds").includes(existing.id)) {
        toggleCategory(existing.id);
      }
      return setCategoryInput("");
    }
    if (!session) {
      return router.push("/admin/login");
    }
    setAddingCategory(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description: "" }),
      });
      if (res.ok) {
        const { category } = await res.json();
        setAllCategories((prev) => [...prev, category]);
        toggleCategory(category.id);
        setCategoryInput("");
      } else {
        console.error("Failed to create category:", await res.json());
      }
    } catch (err) {
      console.error("Error creating category:", err);
    } finally {
      setAddingCategory(false);
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    if (!session) {
      return router.push("/admin/login");
    }
    setSaving(true);
    try {
      const url = project ? `/api/projects/${project.id}` : "/api/projects";
      const method = project ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          // Primary image fields mirror the selected gallery image
          imagePath:
            data.images.find((img) => img.url === data.imageUrl)?.path ?? "",
          images: data.images.map((img) => ({
            url: img.url,
            path: img.path || null,
            width: img.width ?? null,
            height: img.height ?? null,
          })),
          links: data.links.map((l) => ({
            type: l.type,
            label: l.label?.trim() || null,
            url: l.url,
          })),
          // Clear the legacy single-value fields; the lists are the source of truth now
          categoryId: null,
          liveUrl: null,
          githubUrl: null,
        }),
      });

      if (res.ok) {
        router.push("/admin/projects");
        router.refresh();
      } else {
        const err = await res.json();
        console.error("Failed to save project:", err);
      }
    } catch (err) {
      console.error("Error saving project:", err);
    } finally {
      setSaving(false);
    }
  };

  // Deletes the stored file; the image is removed from the form either way
  const deleteImage = async (image: GalleryImage) => {
    if (!session) {
      router.push("/admin/login");
      return false;
    }
    if (!confirm("Remove this image from the project?")) return false;
    if (image.path) {
      try {
        await edgestore.projectImages.delete({ url: image.url });
      } catch (err) {
        console.error("Error deleting image:", err);
      }
    }
    return true;
  };

  const addToList = (
    name: "tags" | "technologies" | "features",
    value: string,
    clear: () => void
  ) => {
    const item = value.trim();
    if (!item) return;
    const current = form.getValues(name) ?? [];
    if (!current.includes(item)) {
      form.setValue(name, [...current, item], { shouldValidate: true });
    }
    clear();
  };

  const removeFromList = (
    name: "tags" | "technologies" | "features",
    value: string
  ) => {
    const current = form.getValues(name) ?? [];
    form.setValue(
      name,
      current.filter((x) => x !== value),
      { shouldValidate: true }
    );
  };

  const listField = (
    name: "tags" | "technologies" | "features",
    label: string,
    input: string,
    setInput: (v: string) => void
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addToList(name, input, () => setInput(""));
                }
              }}
              placeholder={`Type a ${label.toLowerCase().replace(/s$/, "")} and press Enter`}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={() => addToList(name, input, () => setInput(""))}
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 empty:hidden">
            {field.value?.map((item, i) => (
              <Badge key={i} variant="secondary" className="gap-1 pr-1">
                {item}
                <button
                  type="button"
                  onClick={() => removeFromList(name, item)}
                  aria-label={`Remove ${item}`}
                  className="p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
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
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <EditorLayout
          title={project ? "Edit Project" : "Add New Project"}
          backHref="/admin/projects"
          saving={saving}
          saveLabel={project ? "Update" : "Create"}
          sidebar={
            <>
              <FormSection title="Details">
                <FormField
                  control={form.control}
                  name="completionDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Completion date</FormLabel>
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
                      <FormLabel>Team size</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Solo, 3 developers" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-3 rounded-md border p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5"
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel>Featured</FormLabel>
                        <FormDescription>Show on the homepage.</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </FormSection>
            </>
          }
        >
          <FormSection title="Basic information">
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
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="One or two sentences shown on the project card"
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
                  <FormLabel>Details (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={8}
                      placeholder="The problem, your approach, challenges, results..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Shown on the project page. Line breaks are kept.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          <FormSection
            title="Images"
            description="Upload as many as you like. The primary image is used on project cards and shown first in the gallery."
          >
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <ProjectImagesField
                    images={field.value}
                    primaryUrl={form.watch("imageUrl")}
                    onChange={(images, primaryUrl) => {
                      field.onChange(images);
                      form.setValue("imageUrl", primaryUrl, { shouldValidate: true });
                    }}
                    onDelete={deleteImage}
                  />
                  <FormMessage />
                  {form.formState.errors.imageUrl && (
                    <p className="text-destructive text-sm">
                      {form.formState.errors.imageUrl.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </FormSection>

          <FormSection
            title="Categories"
            description="Pick every category that fits, e.g. App and Backend. Visitors can filter by these."
          >
            <FormField
              control={form.control}
              name="categoryIds"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-wrap gap-2">
                    {allCategories.map((c) => {
                      const selected = field.value.includes(c.id);
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => toggleCategory(c.id)}
                          aria-pressed={selected}
                          className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm transition-colors cursor-pointer ${
                            selected
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-gray-300 dark:border-white/15 hover:bg-gray-100 dark:hover:bg-white/5"
                          }`}
                        >
                          {selected && <Check className="h-3 w-3" />}
                          {c.name}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Input
                      value={categoryInput}
                      onChange={(e) => setCategoryInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          createCategory();
                        }
                      }}
                      placeholder="New category, e.g. AI/ML"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={createCategory}
                      disabled={addingCategory}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="hidden sm:inline">Add</span>
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          <FormSection
            title="Links"
            description="Live site, GitHub, App Store, Play Store or anything else. The first link is shown as the main button."
          >
            {links.fields.length === 0 && (
              <p className="text-sm text-muted-foreground">No links yet.</p>
            )}
            {links.fields.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-[1fr_auto] sm:grid-cols-[9.5rem_10rem_1fr_auto] gap-2 items-start"
              >
                <FormField
                  control={form.control}
                  name={`links.${index}.type`}
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormControl>
                        <select
                          {...field}
                          aria-label="Link type"
                          className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs dark:bg-input/30"
                        >
                          {LINK_TYPES.map((t) => (
                            <option key={t} value={t} className="bg-background">
                              {t === "other" ? "Other" : LINK_META[t].label}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Remove link"
                  onClick={() => links.remove(index)}
                  className="sm:order-last"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <FormField
                  control={form.control}
                  name={`links.${index}.label`}
                  render={({ field }) => (
                    <FormItem className="col-span-2 sm:col-span-1">
                      <FormControl>
                        <Input placeholder="Label (optional)" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`links.${index}.url`}
                  render={({ field }) => (
                    <FormItem className="col-span-2 sm:col-span-1">
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => links.append({ type: "other", label: "", url: "" })}
            >
              <Plus className="h-4 w-4" /> Add link
            </Button>
          </FormSection>

          <FormSection title="Tech stack & highlights">
            {listField("technologies", "Technologies", techInput, setTechInput)}
            {listField("tags", "Tags", tagInput, setTagInput)}
            {listField("features", "Key features", featureInput, setFeatureInput)}
          </FormSection>
        </EditorLayout>
      </form>
    </Form>
  );
}
