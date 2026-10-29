import z from "zod";
import { LINK_TYPES } from "@/lib/project";

export const projectLinkSchema = z.object({
  type: z.enum(LINK_TYPES),
  label: z.string().optional(),
  url: z.url("Enter a valid URL (including https://)"),
});

export const projectImageSchema = z.object({
  url: z.string().min(1),
  path: z.string().nullable().optional(),
  width: z.number().int().positive().nullable().optional(),
  height: z.number().int().positive().nullable().optional(),
});

export const projectSchema = z.object({
  title: z.string().min(3, "Title should be more than 3 characters"),
  description: z.string().min(10, "Description should be more than 10 characters"),
  detailedDescription: z.string().optional(),
  // URL of the primary image; must be one of `images`
  imageUrl: z.string().min(1, "Choose a primary image"),
  images: z.array(projectImageSchema).min(1, "Add at least one image"),
  categoryIds: z.array(z.string()).min(1, "Select at least one category"),
  imagePath: z.string(),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  technologies: z.array(z.string()).min(1, "Add at least one technology"),
  features: z.array(z.string()).optional(),
  links: z.array(projectLinkSchema),
  completionDate: z.string().optional(),
  teamSize: z.string().optional(),
  featured: z.boolean().default(false),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
