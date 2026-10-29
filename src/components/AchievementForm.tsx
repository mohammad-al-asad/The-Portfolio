"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { EdgestoreUploader } from "@/components/EdgestoreUploader";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import {
  achievementSchema,
  type AchievementFormData,
} from "@/lib/validations/qualifications";
import { useEdgeStore } from "@/lib/edgestore";
import { achievements } from "../../generated/prisma";
import EditorLayout, { FormSection } from "@/components/EditorLayout";

const BACK_URL = "/admin/qualifications?tab=achievement";

export default function AchievementForm({
  achievement,
}: {
  achievement?: achievements;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);

  const form = useForm<AchievementFormData>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      title: achievement?.title ?? "",
      organization: achievement?.organization ?? "",
      year: achievement?.year ?? "",
      description: achievement?.description ?? "",
      detailedDescription: achievement?.detailedDescription ?? "",
      technologies: achievement?.technologies ?? [],
      imageUrl: achievement?.imageUrl ?? "",
      imagePath: achievement?.imagePath ?? "",
      featured: achievement?.featured ?? false,
    },
  });

  const onSubmit = async (data: AchievementFormData) => {
    if (!session) {
      return router.push("/admin/login");
    }
    setSaving(true);
    try {
      const url = achievement
        ? `/api/achievements/${achievement.id}`
        : "/api/achievements";
      const method = achievement ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push(BACK_URL);
        router.refresh();
      } else {
        console.error("Failed to save achievement:", await res.json());
      }
    } catch (error) {
      console.error("Error saving achievement:", error);
    } finally {
      setSaving(false);
    }
  };

  const removeImage = async () => {
    if (!session) {
      return router.push("/admin/login");
    }
    if (!confirm("Are you sure you want to delete this image?")) return;
    const imageUrl = form.getValues("imageUrl");
    if (imageUrl) {
      try {
        await edgestore.qualificationImages.delete({
          url: imageUrl,
        });
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
    form.setValue("imageUrl", "");
    form.setValue("imagePath", "");
  };

  const addTech = () => {
    const tech = techInput.trim();
    if (!tech) return;
    const current = form.getValues("technologies");
    if (!current.includes(tech)) {
      form.setValue("technologies", [...current, tech], {
        shouldValidate: true,
      });
    }
    setTechInput("");
  };

  const removeTech = (tech: string) => {
    const current = form.getValues("technologies");
    form.setValue(
      "technologies",
      current.filter((t) => t !== tech),
      { shouldValidate: true }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <EditorLayout
          title={achievement ? "Edit Achievement" : "Add New Achievement"}
          backHref={BACK_URL}
          saving={saving}
          saveLabel={achievement ? "Update" : "Create"}
          sidebar={
            <>
            <FormSection
              title="Certificate"
              description="Shown on the achievement page. Click it there to open full size."
            >
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <EdgestoreUploader
                        fit="contain"
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
            </FormSection>
            <FormSection title="Visibility">
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-start gap-3 rounded-md border p-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(v) => field.onChange(v === true)}
                        className="mt-0.5"
                      />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                        Show on the homepage. Everything is listed on the
                        Qualifications page.
                      </FormDescription>
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
                    <Input placeholder="e.g., Google Developer Winner" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_9rem] gap-5">
              <FormField
                control={form.control}
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
                control={form.control}
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
            </div>
          </FormSection>

          <FormSection title="Description">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="One or two sentences shown on the card"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Shown on the homepage card.</FormDescription>
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
                      placeholder="The full story: what you did, how it was judged, what you learned..."
                      rows={8}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Shown on the achievement page. Line breaks are kept.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          <FormSection title="Skills & Technologies">
            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2">
                    <Input
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTech();
                        }
                      }}
                      placeholder="Type a skill or technology and press Enter"
                    />
                    <Button type="button" variant="secondary" onClick={addTech}>
                      Add
                    </Button>
                  </div>
                  {field.value.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {field.value.map((t, i) => (
                        <Badge key={i} variant="secondary" className="gap-1 pr-1">
                          {t}
                          <button
                            type="button"
                            onClick={() => removeTech(t)}
                            aria-label={`Remove ${t}`}
                            className="p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>
        </EditorLayout>
      </form>
    </Form>
  );
}
