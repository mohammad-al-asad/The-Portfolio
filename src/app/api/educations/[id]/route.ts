import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/apiAuth";
import z from "zod";
import { prisma } from "@/lib/db";
import { refreshPublicPages } from "@/lib/revalidate";

// GET a specific education
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const education = await prisma.educations.findUnique({
      where: {
        id: id,
      },
    });

    if (!education) {
      return NextResponse.json(
        { error: "Education not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(education);
  } catch (error) {
    console.error("GET /api/educations/[id] failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch education" },
      { status: 500 }
    );
  }
}

// UPDATE an education
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const body = await request.json();

    const updatedEducation = await prisma.educations.update({
      where: {
        id: id,
      },
      data: body,
    });

    refreshPublicPages();

    return NextResponse.json({
      message: "Education updated successfully",
      education: updatedEducation,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error("PUT /api/educations/[id] failed:", error);
    return NextResponse.json(
      { error: "Failed to update education" },
      { status: 500 }
    );
  }
}

// DELETE an education
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const denied = await requireAdmin();
    if (denied) return denied;
    // Delete Education
    await prisma.educations.delete({
      where: {
        id: id,
      },
    });

    refreshPublicPages();

    return NextResponse.json({ message: "Education deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/educations/[id] failed:", error);
    return NextResponse.json(
      { error: "Failed to delete education" },
      { status: 500 }
    );
  }
}
