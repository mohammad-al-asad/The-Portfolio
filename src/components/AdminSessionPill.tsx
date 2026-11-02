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
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-background/85 backdrop-blur-md py-1 pl-3 pr-1 shadow-lg">
        {status === "loading" ? (
          <>
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-7 w-16 rounded-md" />
          </>
        ) : session ? (
          <>
            <span className="flex items-center gap-1.5 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-muted-foreground hidden sm:inline">Editing as</span>
              <span className="font-medium max-w-[8rem] truncate">
                {session.user.name || session.user.email}
              </span>
            </span>
            <Button
              size="sm"
              variant="outline"
              className="h-7 gap-1 rounded-md px-2 text-xs has-[>svg]:px-2"
              onClick={() => signOut({ callbackUrl: "/admin" })}
            >
              <LogOut className="h-3.5 w-3.5" />
              Log out
            </Button>
          </>
        ) : (
          <>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Eye className="h-3.5 w-3.5" />
              View only
            </span>
            <Button asChild size="sm" className="h-7 gap-1 rounded-md px-2 text-xs has-[>svg]:px-2">
              <Link href={`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`}>
                <LogIn className="h-3.5 w-3.5" />
                Log in to edit
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
