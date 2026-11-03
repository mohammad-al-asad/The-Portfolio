import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

/** Whether the request comes from the signed-in admin */
export async function isAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return session?.user.role === "admin";
}

/**
 * For admin-only API routes: returns a 401 response to send back, or null when
 * the admin is signed in.
 *
 *   const denied = await requireAdmin();
 *   if (denied) return denied;
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  return (await isAdmin())
    ? null
    : NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
