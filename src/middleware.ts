import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_PATHS = ["/admin"];
const AUTH_PATHS = ["/admin/login"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Check if route is admin route
  const isAdminPath = ADMIN_PATHS.some((path) =>
    pathname.startsWith(path)
  );
  
  // Check if route is auth route
  const isAuthPath = AUTH_PATHS.includes(pathname);

  const token = await getToken({ req });
  
  // Redirect authenticated users away from auth pages
  if (isAuthPath) {
    if (token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // Protect admin routes
  // if (isAdminPath) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/admin/login", req.url));
  //   }
    
  //   return NextResponse.next();
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin/login"],
};