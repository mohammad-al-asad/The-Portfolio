import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/db";

// GET all projects
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await prisma.projects.findMany({
      include: { category: true },
    });

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST a new project
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const project = await prisma.projects.create({ data: body });

    return NextResponse.json(
      { message: "Project created successfully", project },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
