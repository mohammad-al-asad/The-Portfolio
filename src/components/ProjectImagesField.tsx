"use client";

import { useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { ImagePlus, Loader2, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";

export type GalleryImage = {
  url: string;
  path?: string | null;
  width?: number | null;
  height?: number | null;
};

// Read an image's natural size so the gallery can use its real aspect ratio
function measure(url: string): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

export default function ProjectImagesField({
  images,
  primaryUrl,
  onChange,
  onDelete,
}: {
  images: GalleryImage[];
  primaryUrl: string;
  onChange: (images: GalleryImage[], primaryUrl: string) => void;
  /** Remove the stored file (e.g. from EdgeStore); return false to cancel */
  onDelete: (image: GalleryImage) => Promise<boolean>;
}) {
  const { edgestore } = useEdgeStore();
  const [upload, setUpload] = useState<{ current: number; total: number; progress: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Upload dropped files one by one, adding each to the gallery as it finishes
  const uploadFiles = async (files: File[]) => {
    setError(null);
    let list = images;
    let primary = primaryUrl;
    for (const [i, file] of files.entries()) {
      setUpload({ current: i + 1, total: files.length, progress: 0 });
      try {
        const res = await edgestore.projectImages.upload({
          file,
          options: { temporary: false },
          onProgressChange: (progress) =>
            setUpload({ current: i + 1, total: files.length, progress }),
        });
        const size = await measure(res.url);
        list = [
          ...list,
          {
            url: res.url,
            path: typeof res.path === "string" ? res.path : null,
            width: size?.width ?? null,
            height: size?.height ?? null,
          },
        ];
        primary = primary || res.url;
        onChange(list, primary);
      } catch (err) {
        console.error("Upload error:", err);
        setError(`Couldn't upload ${file.name}`);
      }
    }
    setUpload(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"] },
    maxSize: 50 * 1024 * 1024,
    multiple: true,
    disabled: Boolean(upload),
    onDrop: (accepted, rejected) => {
      if (rejected.length) setError(`${rejected.length} file(s) skipped: images up to 50 MB only`);
      if (accepted.length) uploadFiles(accepted);
    },
  });

  const remove = async (image: GalleryImage) => {
    if (!(await onDelete(image))) return;
    const rest = images.filter((img) => img.url !== image.url);
    const nextPrimary = image.url === primaryUrl ? rest[0]?.url ?? "" : primaryUrl;
    onChange(rest, nextPrimary);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img) => {
            const primary = img.url === primaryUrl;
            return (
              <div
                key={img.url}
                className={cn(
                  "group relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted",
                  primary && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                )}
              >
                <Image
                  src={img.url}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, 240px"
                  className="object-contain"
                />
                {primary && (
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                    <Star className="h-3 w-3 fill-current" /> Primary
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 flex justify-end gap-1 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100 transition-opacity">
                  {!primary && (
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="h-7 px-2 text-xs"
                      onClick={() => onChange(images, img.url)}
                    >
                      <Star className="h-3.5 w-3.5" /> Make primary
                    </Button>
                  )}
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="h-7 w-7"
                    aria-label="Remove image"
                    onClick={() => remove(img)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                {img.width && img.height && (
                  <span className="absolute right-2 top-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white">
                    {img.width}×{img.height}
                  </span>
                )}
              </div>
            );
          })}

        {/* Upload tile takes the next free slot in the grid */}
        <div
          {...getRootProps({
            className: cn(
              "relative aspect-[4/3] flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed px-3 text-center text-xs text-muted-foreground transition-colors cursor-pointer",
              isDragActive
                ? "border-primary bg-primary/5 text-foreground"
                : "border-gray-300 dark:border-white/15 hover:border-gray-400 dark:hover:border-white/25 hover:bg-muted/50",
              upload && "cursor-wait"
            ),
          })}
        >
          <input {...getInputProps()} />
          {upload ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="font-medium text-foreground">
                Uploading {upload.total > 1 ? `${upload.current} of ${upload.total}` : ""}
              </span>
              <span>{upload.progress}%</span>
            </>
          ) : (
            <>
              <ImagePlus className="h-6 w-6" />
              <span className="font-medium text-foreground">
                {isDragActive ? "Drop to upload" : "Add images"}
              </span>
              <span>Drag & drop or click · up to 50 MB each</span>
            </>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
