import type { IconType } from "react-icons";
import {
  FaAppStoreIos,
  FaGithub,
  FaGlobe,
  FaGooglePlay,
  FaLink,
} from "react-icons/fa";
import type {
  ProjectImage,
  ProjectLink,
  projects,
} from "../../generated/prisma";

export const LINK_TYPES = [
  "live",
  "github",
  "appstore",
  "playstore",
  "other",
] as const;

export type LinkType = (typeof LINK_TYPES)[number];

export const LINK_META: Record<LinkType, { label: string; icon: IconType }> = {
  live: { label: "Live Demo", icon: FaGlobe },
  github: { label: "Source Code", icon: FaGithub },
  appstore: { label: "App Store", icon: FaAppStoreIos },
  playstore: { label: "Play Store", icon: FaGooglePlay },
  other: { label: "Link", icon: FaLink },
};

export const linkMeta = (type: string) =>
  LINK_META[(LINK_TYPES as readonly string[]).includes(type) ? (type as LinkType) : "other"];

// Projects saved before multi-link support only have liveUrl / githubUrl
export function getProjectLinks(project: projects): ProjectLink[] {
  if (project.links?.length) return project.links;
  const legacy: ProjectLink[] = [];
  if (project.liveUrl) legacy.push({ type: "live", label: null, url: project.liveUrl });
  if (project.githubUrl) legacy.push({ type: "github", label: null, url: project.githubUrl });
  return legacy;
}

// Technologies offered as filters on /projects. Each matches its spelling
// variants (compared without case, dots, spaces, or dashes).
export const TECH_FILTERS: { label: string; aliases: string[] }[] = [
  { label: "React Native", aliases: ["reactnative"] },
  { label: "Expo", aliases: ["expo"] },
  { label: "React", aliases: ["react", "reactjs"] },
  { label: "Next.js", aliases: ["nextjs", "next"] },
  { label: "Node.js", aliases: ["nodejs", "node"] },
  { label: "Express", aliases: ["express", "expressjs"] },
  { label: "TypeScript", aliases: ["typescript", "ts"] },
  { label: "MongoDB", aliases: ["mongodb", "mongo"] },
  { label: "FastAPI", aliases: ["fastapi"] },
];

const normalizeTech = (name: string) => name.toLowerCase().replace(/[\s.\-_]/g, "");

export function usesTech(project: projects, label: string): boolean {
  const filter = TECH_FILTERS.find((f) => f.label === label);
  if (!filter) return false;
  return project.technologies.some((t) => filter.aliases.includes(normalizeTech(t)));
}

// Gallery images with the primary first. Projects saved before gallery
// support only have imageUrl / imagePath.
export function getProjectImages(project: projects): ProjectImage[] {
  const images = project.images?.length
    ? project.images
    : project.imageUrl
    ? [{ url: project.imageUrl, path: project.imagePath || null, width: null, height: null }]
    : [];
  const primary = images.findIndex((img) => img.url === project.imageUrl);
  return primary > 0
    ? [images[primary], ...images.filter((_, i) => i !== primary)]
    : images;
}

// Projects saved before multi-category support only have categoryId
export function getProjectCategoryIds(project: projects): string[] {
  if (project.categoryIds?.length) return project.categoryIds;
  return project.categoryId ? [project.categoryId] : [];
}
