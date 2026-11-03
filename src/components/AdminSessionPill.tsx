"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

// Floating pill on admin pages: your name + Log out, or just Log in to edit
export default function AdminSessionPill() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Nothing until the session is known (no placeholder), then the right button
  if (pathname === "/admin/login" || status === "loading") return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {session ? (
        // One pill: name + a plain Log out (no second border inside)
        <div className="flex items-center gap-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-background/85 backdrop-blur-md py-1 pl-4 pr-1 shadow-lg">
          <span className="max-w-[10rem] truncate text-sm font-medium">
            {session.user.name || session.user.email}
          </span>
          <Button
            size="sm"
            variant="ghost"
            className="rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-500/10 dark:hover:text-red-300"
            onClick={() => signOut({ callbackUrl: "/admin" })}
          >
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
      ) : (
        // Logged out: just the button, same frosted look as the signed-in pill
        <Button
          asChild
          className="h-10 rounded-xl border border-gray-200 bg-background/85 px-4 text-foreground shadow-lg backdrop-blur-md hover:bg-muted dark:border-gray-700"
        >
          <Link href={`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`}>
            <LogIn className="h-4 w-4" />
            Log in to edit
          </Link>
        </Button>
      )}
    </div>
  );
}
