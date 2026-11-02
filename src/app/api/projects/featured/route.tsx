import { prisma } from "@/lib/db";
import { sortByCompletion } from "@/lib/sortProjects";
import { NextResponse } from "next/server";

// GET featured projects
export async function GET() {
  try {
    const projects = sortByCompletion(
      await prisma.projects.findMany({ where: { featured: true } })
    );

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
