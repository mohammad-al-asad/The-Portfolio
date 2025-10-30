import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

// Post Resume
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();

    if (body && body.resumeUrl) {
      const resume = await prisma.resumes.create({
        data: { resumeUrl: body.resumeUrl },
      });
      return NextResponse.json(resume);
    } else {
      return NextResponse.json({ error: "Invalid Url" }, { status: 403 });
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to get user data" },
      { status: 500 }
    );
  }
}

// GET The Resume
export async function GET() {
  try {
    const resumes = await prisma.resumes.findMany();
    return NextResponse.json(resumes[0]);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch resume" },
      { status: 500 }
    );
  }
}

// Delete The Resume
export async function DELETE(req: NextRequest) {
  const body = await req.json();
  try {
    if (!body && body.resumeUrl) {
      return NextResponse.json(
        { error: "Invalid resume Url" },
        { status: 403 }
      );
    }
    const resume = await prisma.resumes.deleteMany({
      where: {
        resumeUrl: body.resumeUrl,
      },
    });
    return NextResponse.json(resume);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch resume" },
      { status: 500 }
    );
  }
}
