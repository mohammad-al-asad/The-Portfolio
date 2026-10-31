"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 pt-24 text-center">
      <div className="rounded-full bg-red-500/10 p-5">
        <TriangleAlert className="h-10 w-10 text-red-500" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          A hiccup on my side. Try again, and if it keeps happening, let me know.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>
          <RotateCcw className="h-4 w-4" /> Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </div>
  );
}
