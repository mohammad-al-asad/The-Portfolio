import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// GET featured projects
export async function GET() {
  try {
    const projects = await prisma.projects.findMany({
      where: {
        featured: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
