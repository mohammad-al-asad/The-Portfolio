import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { refreshPublicPages } from "@/lib/revalidate";

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user.role === "admin";
}

// Post Resume
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();

    if (body && body.resumeUrl) {
      const resume = await prisma.resumes.create({
        data: { resumeUrl: body.resumeUrl },
      });
      refreshPublicPages();
      return NextResponse.json(resume);
    } else {
      return NextResponse.json({ error: "Invalid Url" }, { status: 400 });
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to save resume" },
      { status: 500 }
    );
  }
}

// GET The Resume
export async function GET() {
  try {
    const resume = await prisma.resumes.findFirst();
    return NextResponse.json(resume ?? {});
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch resume" },
      { status: 500 }
    );
  }
}

// Delete The Resume
export async function DELETE(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    if (!body?.resumeUrl) {
      return NextResponse.json(
        { error: "Invalid resume Url" },
        { status: 400 }
      );
    }
    const resume = await prisma.resumes.deleteMany({
      where: {
        resumeUrl: body.resumeUrl,
      },
    });
    refreshPublicPages();
    return NextResponse.json(resume);
  } catch {
    return NextResponse.json(
      { error: "Failed to delete resume" },
      { status: 500 }
    );
  }
}
