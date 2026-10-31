"use client";

import React, { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { X, FileText, Upload, Download } from "lucide-react";
import { UploaderProvider, UploadFn } from "./upload/uploader-provider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface EdgestoreCVUploaderProps {
  value: string;
  onChange: (value: string, path: string) => void;
  onRemove: () => void;
  disabled?: boolean;
}

export function EdgestoreCVUploader({
  value,
  onChange,
  onRemove,
  disabled = false,
}: EdgestoreCVUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const { edgestore } = useEdgeStore();

  const { data: session } = useSession();
  const router = useRouter();

  const uploadFn: UploadFn = React.useCallback(
    async ({ file, signal }) => {
      if (!session) {
        router.push("/admin/login");
        return { url: "" };
      }
      if (!file) {
        return { url: "" };
      }

      setUploading(true);
      setProgress(0);

      try {
        const res = await edgestore.resumeFiles.upload({
          file,
          options: {
            temporary: false,
          },
          signal,
          onProgressChange: (progress: number) => {
            setProgress(progress);
          },
        });
        await fetch("/api/resume", {
          method: "POST",
          body: JSON.stringify({
            resumeUrl: res.url,
          }),
        });
        onChange(res.url, typeof res.path === "string" ? res.path : "");
        return res;
      } catch (error) {
        console.error("Upload error:", error);
        return { url: "" };
      } finally {
        setUploading(false);
        setProgress(0);
      }
    },
    [edgestore, onChange]
  );

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    await uploadFn({
      file,
      signal: new AbortController().signal,
      onProgressChange: (progress: number) => setProgress(progress),
    });
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    await uploadFn({
      file,
      signal: new AbortController().signal,
      onProgressChange: (progress: number) => setProgress(progress),
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
  };

  if (value) {
    return (
      <div className="space-y-4">
        <div className="relative border-2 border-green-200 dark:border-green-800 rounded-lg p-6 bg-green-50 dark:bg-green-950/20">
          <div className="flex flex-col gap-3 items-center space-x-4">
            <div className="flex-shrink-0">
              <FileText className="h-12 w-12 text-green-600" />
            </div>
            <div className="flex-1 text-center min-w-0">
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                CV Uploaded Successfully
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 truncate">
                {value.split("/").pop()}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button type="button" variant="outline" size="sm" asChild>
                <a href={value} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  View
                </a>
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={onRemove}
                disabled={disabled}
              >
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <UploaderProvider uploadFn={uploadFn} autoUpload>
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            dragActive
              ? "border-blue-400 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-600"
              : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
          } ${
            disabled || uploading
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={disabled || uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Upload your CV
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Drag and drop your PDF file or click to browse
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={disabled || uploading}
              onClick={() =>
                (
                  document.querySelector(
                    'input[type="file"]'
                  ) as HTMLInputElement
                )?.click()
              }
            >
              <FileText className="h-4 w-4 mr-2" />
              Choose File
            </Button>
          </div>
        </div>
      </UploaderProvider>

      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Uploading CV... {progress}%
          </p>
        </div>
      )}

      <div className="text-center space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          PDF format only • Maximum file size: 5MB
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Your CV will be stored securely and can be downloaded by visitors
        </p>
      </div>
    </div>
  );
}
