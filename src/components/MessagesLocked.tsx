"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Shown instead of message contents to anyone who isn't the admin
export default function MessagesLocked({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 text-center",
        compact ? "py-12" : "h-full py-16"
      )}
    >
      <div className="rounded-full bg-gradient-to-br from-blue-500/15 to-purple-600/15 p-4">
        <Lock className={cn("text-blue-500", compact ? "h-6 w-6" : "h-8 w-8")} />
      </div>
      <div className="space-y-1">
        <p className={cn("font-semibold", !compact && "text-lg")}>Messages are private</p>
        <p className="text-sm text-muted-foreground max-w-xs">
          They contain visitors&apos; names and emails. Log in as admin to read them.
        </p>
      </div>
      <Button asChild size="sm" className="mt-1 rounded-full">
        <Link href={`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`}>
          <LogIn className="h-4 w-4" />
          Log in
        </Link>
      </Button>
    </div>
  );
}
