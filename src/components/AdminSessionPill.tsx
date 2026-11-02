"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Floating pill on admin pages: your name + Log out, or just Log in to edit
export default function AdminSessionPill() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (pathname === "/admin/login") return null;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div
        className={`flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-background/85 backdrop-blur-md py-1 pr-1 shadow-lg ${
          session ? "pl-3" : "pl-1"
        }`}
      >
        {status === "loading" ? (
          <Skeleton className="h-7 w-24 rounded-md" />
        ) : session ? (
          <>
            <span className="max-w-[8rem] truncate text-xs font-medium">
              {session.user.name || session.user.email}
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
          <Button asChild size="sm" className="h-7 gap-1 rounded-md px-2 text-xs has-[>svg]:px-2">
            <Link href={`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`}>
              <LogIn className="h-3.5 w-3.5" />
              Log in to edit
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
