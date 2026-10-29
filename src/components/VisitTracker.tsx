"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Counts a page view for each public page the visitor opens
export default function VisitTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    // Skip the admin area, and React's double effect run in development
    if (pathname.startsWith("/admin") || lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    fetch("/api/visit", { method: "POST", keepalive: true }).catch(() => {});
  }, [pathname]);

  return null;
}
