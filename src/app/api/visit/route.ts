import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { BOT_PATTERN, VISITOR_COOKIE, dayKey } from "@/lib/analytics";

// Record one page view; the first visit from a browser also counts a visitor
export async function POST(req: NextRequest) {
  const res = new NextResponse(null, { status: 204 });
  if (BOT_PATTERN.test(req.headers.get("user-agent") ?? "")) return res;

  const isNewVisitor = !req.cookies.get(VISITOR_COOKIE)?.value;
  const id = dayKey(new Date());
  const increment = {
    pageViews: { increment: 1 },
    ...(isNewVisitor ? { visitors: { increment: 1 } } : {}),
  };

  try {
    await prisma.dailyVisits.upsert({
      where: { id },
      create: { id, pageViews: 1, visitors: isNewVisitor ? 1 : 0 },
      update: increment,
    });
  } catch {
    // Two first-of-the-day requests can race on create; the loser just updates
    await prisma.dailyVisits
      .update({ where: { id }, data: increment })
      .catch((error) => console.error("Failed to record visit:", error));
  }

  if (isNewVisitor) {
    res.cookies.set(VISITOR_COOKIE, crypto.randomUUID(), {
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }
  return res;
}
