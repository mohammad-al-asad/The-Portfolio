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
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div
        className={`flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-background/85 backdrop-blur-md py-1.5 pr-1.5 shadow-lg ${
          session ? "pl-4" : "pl-1.5"
        }`}
      >
        {status === "loading" ? (
          <Skeleton className="h-8 w-28 rounded-md" />
        ) : session ? (
          <>
            <span className="max-w-[10rem] truncate text-sm font-medium">
              {session.user.name || session.user.email}
            </span>
            <Button
              size="sm"
              variant="outline"
              className="rounded-md"
              onClick={() => signOut({ callbackUrl: "/admin" })}
            >
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </>
        ) : (
          <Button asChild size="sm" className="rounded-md">
            <Link href={`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`}>
              <LogIn className="h-4 w-4" />
              Log in to edit
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
