export type ImageBucket = "projectImages" | "qualificationImages";

// Which EdgeStore bucket a file URL lives in, so deletes hit the right one.
// Returns null for anything that isn't an EdgeStore file (e.g. GitHub images).
export function edgeStoreBucket(url: string | null | undefined): ImageBucket | null {
  const match = url?.match(/^https:\/\/files\.edgestore\.dev\/[^/]+\/(projectImages|qualificationImages)\//);
  return match ? (match[1] as ImageBucket) : null;
}
