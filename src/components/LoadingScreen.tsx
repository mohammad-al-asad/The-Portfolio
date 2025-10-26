"use client";

import { Loader2 } from "lucide-react";

export default function LoadingScreen({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-fit mt-32">
      <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
      <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
        {message}
      </p>
    </div>
  );
}
