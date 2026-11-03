import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/apiAuth";
import { prisma } from "@/lib/db";
import { refreshPublicPages } from "@/lib/revalidate";

// GET a specific achievement
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const achievement = await prisma.achievements.findUnique({
      where: { id: id },
    });

    if (!achievement) {
      return NextResponse.json(
        { error: "Achievement not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(achievement);
  } catch (error) {
    console.error("GET /api/achievements/[id] failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch achievement" },
      { status: 500 }
    );
  }
}

// UPDATE a specific achievement
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const body = await request.json();

    const achievement = await prisma.achievements.update({
      where: { id: id },
      data: body,
    });

    refreshPublicPages();

    return NextResponse.json({
      message: "Achievement updated successfully",
      achievement,
    });
  } catch (error) {
    console.error("PUT /api/achievements/[id] failed:", error);
    return NextResponse.json(
      { error: "Failed to update achievement" },
      { status: 500 }
    );
  }
}

// DELETE a specific achievement
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const denied = await requireAdmin();
    if (denied) return denied;
    // Delete
    await prisma.achievements.delete({
      where: { id: id },
    });

    refreshPublicPages();

    return NextResponse.json({ message: "Achievement deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/achievements/[id] failed:", error);
    return NextResponse.json(
      { error: "Failed to delete achievement" },
      { status: 500 }
    );
  }
}
