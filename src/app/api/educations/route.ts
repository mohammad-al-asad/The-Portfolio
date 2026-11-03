import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/apiAuth";
import { prisma } from "@/lib/db";
import { refreshPublicPages } from "@/lib/revalidate";

// GET all educations
export async function GET() {
  try {
    const educations = await prisma.educations.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(educations);
  } catch (error) {
    console.error("GET /api/educations failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch educations" },
      { status: 500 }
    );
  }
}

// POST a new education
export async function POST(request: NextRequest) {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const body = await request.json();

    const education = await prisma.educations.create({ data: body });

    refreshPublicPages();

    return NextResponse.json(
      { message: "Education created successfully", education },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/educations failed:", error);
    return NextResponse.json(
      { error: "Failed to create education" },
      { status: 500 }
    );
  }
}
