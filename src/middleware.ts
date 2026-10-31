import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Admin pages are viewable by anyone (editing is checked by the API), so the
// only job here is sending signed-in admins away from the login page
export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/login"],
};
