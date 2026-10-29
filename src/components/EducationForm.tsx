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
  educationSchema,
  type EducationFormData,
} from "@/lib/validations/qualifications";
import { useEdgeStore } from "@/lib/edgestore";
import { educations } from "../../generated/prisma";
import EditorLayout, { FormSection } from "@/components/EditorLayout";

const BACK_URL = "/admin/qualifications?tab=education";

export default function EducationForm({
  education,
}: {
  education?: educations;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const [courseInput, setCourseInput] = useState("");
  const [saving, setSaving] = useState(false);

  const form = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: education?.institution ?? "",
      degree: education?.degree ?? "",
      period: education?.period ?? "",
      location: education?.location ?? "",
      description: education?.description ?? "",
      detailedDescription: education?.detailedDescription ?? "",
      gpa: education?.gpa ?? "",
      courses: education?.courses ?? [],
      imageUrl: education?.imageUrl ?? "",
      imagePath: education?.imagePath ?? "",
      featured: education?.featured ?? false,
    },
  });

  const onSubmit = async (data: EducationFormData) => {
    if (!session) {
      return router.push("/admin/login");
    }
    setSaving(true);
    try {
      const url = education
        ? `/api/educations/${education.id}`
        : "/api/educations";
      const method = education ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push(BACK_URL);
        router.refresh();
      } else {
        console.error("Failed to save education:", await res.json());
      }
    } catch (error) {
      console.error("Error saving education:", error);
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

  const addCourse = () => {
    const course = courseInput.trim();
    if (!course) return;
    const current = form.getValues("courses");
    if (!current.includes(course)) {
      form.setValue("courses", [...current, course], { shouldValidate: true });
    }
    setCourseInput("");
  };

  const removeCourse = (course: string) => {
    const current = form.getValues("courses");
    form.setValue(
      "courses",
      current.filter((c) => c !== course),
      { shouldValidate: true }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <EditorLayout
          title={education ? "Edit Education" : "Add New Education"}
          backHref={BACK_URL}
          saving={saving}
          saveLabel={education ? "Update" : "Create"}
          sidebar={
            <>
            <FormSection
              title="Certificate"
              description="Shown on the education page. Click it there to open full size."
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Stanford University" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Bachelor of Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <FormField
                control={form.control}
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
              <FormField
                control={form.control}
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
              <FormField
                control={form.control}
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
                      placeholder="Focus areas, thesis, activities, honours..."
                      rows={8}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Shown on the education page. Line breaks are kept.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          <FormSection title="Key courses">
            <FormField
              control={form.control}
              name="courses"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2">
                    <Input
                      value={courseInput}
                      onChange={(e) => setCourseInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCourse();
                        }
                      }}
                      placeholder="Type a course and press Enter"
                    />
                    <Button type="button" variant="secondary" onClick={addCourse}>
                      Add
                    </Button>
                  </div>
                  {field.value.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {field.value.map((c, i) => (
                        <Badge key={i} variant="secondary" className="gap-1 pr-1">
                          {c}
                          <button
                            type="button"
                            onClick={() => removeCourse(c)}
                            aria-label={`Remove ${c}`}
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
