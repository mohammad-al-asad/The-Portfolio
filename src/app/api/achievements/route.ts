import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/apiAuth";
import { prisma } from "@/lib/db";
import { refreshPublicPages } from "@/lib/revalidate";

// GET all achievements
export async function GET() {
  try {
    const achievements = await prisma.achievements.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(achievements);
  } catch (error) {
    console.error("GET /api/achievements failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch achievements" },
      { status: 500 }
    );
  }
}

// POST a new achievement
export async function POST(request: NextRequest) {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const body = await request.json();

    const achievement = await prisma.achievements.create({ data: body });

    refreshPublicPages();

    return NextResponse.json(
      { message: "Achievement created successfully", achievement },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/achievements failed:", error);
    return NextResponse.json(
      { error: "Failed to create achievement" },
      { status: 500 }
    );
  }
}
