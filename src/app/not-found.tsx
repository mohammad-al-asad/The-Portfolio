import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 pt-24 text-center">
      <div className="rounded-full bg-gradient-to-br from-blue-500/15 to-purple-600/15 p-5">
        <Compass className="h-10 w-10 text-blue-500" />
      </div>
      <div className="space-y-2">
        <p className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          404
        </p>
        <h1 className="text-2xl font-bold">This page took a wrong turn</h1>
        <p className="text-gray-500 dark:text-muted-foreground max-w-md">
          It may have been moved or removed. Let&apos;s get you back on track.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/projects">See my projects</Link>
        </Button>
      </div>
    </div>
  );
}
