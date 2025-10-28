import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET all categories
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body && body.email) {
      const user = await prisma.admins.findFirst({
        where: { email: body.email },
      });
      return NextResponse.json(user);
    } else {
      return NextResponse.json(
        { error: "Invalid Email or Password" },
        { status: 403 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to get user data" },
      { status: 500 }
    );
  }
}
