"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Eye, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Floating status pill on admin pages: view-only + log in, or signed in + log out
export default function AdminSessionPill() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (pathname === "/admin/login") return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-3 rounded-full border border-gray-200 dark:border-gray-700 bg-background/85 backdrop-blur-md py-1.5 pl-4 pr-1.5 shadow-lg">
        {status === "loading" ? (
          <>
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </>
        ) : session ? (
          <>
            <span className="flex items-center gap-2 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-muted-foreground hidden sm:inline">Editing as</span>
              <span className="font-medium max-w-[10rem] truncate">
                {session.user.name || session.user.email}
              </span>
            </span>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full"
              onClick={() => signOut({ callbackUrl: "/admin" })}
            >
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </>
        ) : (
          <>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              View only
            </span>
            <Button asChild size="sm" className="rounded-full">
              <Link href={`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`}>
                <LogIn className="h-4 w-4" />
                Log in to edit
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
