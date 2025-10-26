import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import z from "zod";
import { prisma } from "@/lib/db";

// GET a specific education
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
   const id = (await params).id;
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
    console.error(error);
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
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const updatedEducation = await prisma.educations.update({
      where: {
        id: id,
      },
      data: body,
    });

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

    console.error(error);
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
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Delete Education
    await prisma.educations.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Education deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete education" },
      { status: 500 }
    );
  }
}
