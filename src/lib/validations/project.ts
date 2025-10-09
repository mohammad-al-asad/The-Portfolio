import z from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, "Title should be more than 3 characters"),
  description: z.string().min(10, "Description should be more than 10 characters"),
  detailedDescription: z.string().optional(),
  imageUrl: z.string().url("Invalid image URL").or(z.literal("")),
  imagePath: z.string(),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  technologies: z.array(z.string()).min(1, "Add at least one technology"),
  features: z.array(z.string()).optional(),
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().or(z.literal("")),
  completionDate: z.string().optional(),
  teamSize: z.string().optional(),
  featured: z.boolean().default(false),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
