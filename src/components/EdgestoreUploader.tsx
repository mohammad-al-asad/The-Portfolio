"use client";

import React, { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "@/components/upload/single-image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { UploaderProvider, UploadFn } from "./upload/uploader-provider";

interface EdgestoreUploaderProps {
  value: string;
  onChange: (value: string, path: string) => void;
  onRemove: () => void;
  disabled?: boolean;
}

export function EdgestoreUploader({
  value,
  onChange,
  onRemove,
  disabled = false,
}: EdgestoreUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();

  const uploadFn: UploadFn = React.useCallback(
    async ({ file, signal }) => {
      if (!file) {
        // Always return an object with url property to satisfy UploadFn type
        return { url: "" };
      }

      setUploading(true);
      setProgress(0);

      try {
        const res = await edgestore.projectImages.upload({
          file,
          options: {
            temporary: false,
          },
          signal,
          onProgressChange: (progress: number) => {
            setProgress(progress);
          },
        });

        onChange(res.url, typeof res.path === "string" ? res.path : "");
        // Always return an object with url property to satisfy UploadFn type
        return res;
      } catch (error) {
        console.error("Upload error:", error);
        // Always return an object with url property to satisfy UploadFn type
        return { url: "" };
      } finally {
        setUploading(false);
        setProgress(0);
      }
    },
    [edgestore]
  );

  if (value) {
    return (
      <div className="relative">
        <div className="relative h-48 w-full overflow-hidden rounded-lg border">
          <Image
            src={value}
            fill
            alt="Project preview"
            className="h-full w-full object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8"
            onClick={onRemove}
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <UploaderProvider uploadFn={uploadFn} autoUpload>
        <SingleImageDropzone
          width={200}
          height={200}
          disabled={disabled || uploading}
          dropzoneOptions={{
            maxSize: 50 * 1024 * 1024, // 10MB
            accept: {
              "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
            },
          }}
          className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
        />
      </UploaderProvider>

      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Uploading... {progress}%
          </p>
        </div>
      )}

      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Drag and drop an image or click to browse
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        PNG, JPG, GIF up to 50MB
      </p>
    </div>
  );
}
