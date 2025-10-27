import z from "zod";

// Education Schema
export const educationSchema = z.object({
  institution: z.string().min(3, "Institution name must be at least 3 characters"),
  degree: z.string().min(3, "Degree must be at least 3 characters"),
  period: z.string().min(4, "Please provide a valid study period (e.g., 2018 - 2022)"),
  location: z.string().min(2, "Location is required"),
  description: z.string().min(10, "Description should be more than 10 characters"),
  detailedDescription: z.string().optional(),
  gpa: z.string().optional(),
  courses: z.array(z.string()).min(1, "At least one course is required"),
  imageUrl: z.url("Invalid image URL").or(z.literal("")),
  imagePath: z.string(),
});

// Achievement Schema
export const achievementSchema = z.object({
  title: z.string().min(3, "Title should be more than 3 characters"),
  organization: z.string().min(3, "Organization name must be at least 3 characters"),
  year: z.string().min(4, "Please provide a valid year or range"),
  description: z.string().min(10, "Description should be more than 10 characters"),
  detailedDescription: z.string().optional(),
  imageUrl: z.url("Invalid image URL").or(z.literal("")),
  imagePath: z.string(),
  technologies: z.array(z.string()).min(1, "Add at least one technology"),
});

// Type Inference
export type EducationFormData = z.infer<typeof educationSchema>;
export type AchievementFormData = z.infer<typeof achievementSchema>;
