"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import { edgeColor } from "@/lib/edgeColor";

type Img = { url: string; width?: number | null; height?: number | null };

// Fallback when an older image has no stored size; the browser switches to
// the real ratio once it loads because the image uses width/height auto.
const FALLBACK = { width: 1600, height: 900 };

export default function ProjectGallery({
  images,
  title,
}: {
  images: Img[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  // Edge colour per image URL, used to fill around letterboxed images
  const [bgByUrl, setBgByUrl] = useState<Record<string, string>>({});
  const count = images.length;

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count]
  );

  if (count === 0) return null;
  const current = images[index];
  // The stage keeps the primary image's shape for every slide, so switching
  // images never changes its size; other images are letterboxed inside it.
  const primary = images[0];
  const aspectRatio = `${primary.width || FALLBACK.width} / ${
    primary.height || FALLBACK.height
  }`;

  return (
    <div
      className="space-y-3"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} screenshots`}
      tabIndex={count > 1 ? 0 : undefined}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
    >
      {/* Stage: fixed size (primary image's aspect ratio, capped at 70vh) */}
      <div
        className="group relative rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 p-2 sm:p-4 transition-colors duration-300"
        style={bgByUrl[current.url] ? { backgroundColor: bgByUrl[current.url] } : undefined}
      >
        <a
          href={current.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mx-auto block w-full max-h-[70vh]"
          style={{ aspectRatio }}
          title="Open full size"
        >
          <Image
            key={current.url}
            src={current.url}
            alt={`${title} screenshot ${index + 1} of ${count}`}
            fill
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain rounded-lg animate-in fade-in duration-300"
            onLoad={(e) => {
              const color = edgeColor(e.currentTarget);
              if (color) setBgByUrl((prev) => ({ ...prev, [current.url]: color }));
            }}
          />
          <span className="absolute right-2 top-2 rounded-md bg-black/50 p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <Expand className="h-4 w-4" />
          </span>
        </a>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-2.5 py-0.5 text-xs text-white">
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails keep each image's own shape at a fixed height */}
      {count > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "shrink-0 overflow-hidden rounded-md border-2 transition-all cursor-pointer",
                i === index
                  ? "border-purple-500"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={img.url}
                alt=""
                width={img.width || FALLBACK.width}
                height={img.height || FALLBACK.height}
                sizes="160px"
                className="h-16 w-auto"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
