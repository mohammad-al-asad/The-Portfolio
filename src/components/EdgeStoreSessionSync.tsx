"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useEdgeStore } from "@/lib/edgestore";

// EdgeStore remembers who you are from when the uploader first loaded. Logging
// in or out happens without a page reload, so refresh it whenever that changes;
// otherwise uploads right after logging in would be refused.
export default function EdgeStoreSessionSync() {
  const { status } = useSession();
  const { reset } = useEdgeStore();
  const last = useRef(status);

  useEffect(() => {
    if (status === "loading" || status === last.current) return;
    last.current = status;
    reset().catch(() => {});
  }, [status, reset]);

  return null;
}
