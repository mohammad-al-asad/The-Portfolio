import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/db";
import { INITIAL_VISITORS, dayKey, monthKey } from "@/lib/analytics";

const CHART_MONTHS = 6;

// Dashboard numbers: visitors, content counts, messages, and a monthly chart
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
    const months = Array.from({ length: CHART_MONTHS }, (_, i) =>
      new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (CHART_MONTHS - 1 - i), 1))
    );

    const [allDays, projects, projectsThisMonth, achievements, achievementsThisMonth, messages] =
      await Promise.all([
        prisma.dailyVisits.findMany(),
        prisma.projects.count(),
        prisma.projects.count({ where: { createdAt: { gte: startOfMonth } } }),
        prisma.achievements.count(),
        prisma.achievements.count({ where: { createdAt: { gte: startOfMonth } } }),
        prisma.contactMessage.findMany({ select: { read: true } }),
      ]);

    // Roll daily documents up into months
    const byMonth = new Map<string, { visitors: number; pageViews: number }>();
    let totalVisitors = INITIAL_VISITORS;
    let totalPageViews = 0;
    for (const day of allDays) {
      totalVisitors += day.visitors;
      totalPageViews += day.pageViews;
      const key = day.id.slice(0, 7);
      const month = byMonth.get(key) ?? { visitors: 0, pageViews: 0 };
      month.visitors += day.visitors;
      month.pageViews += day.pageViews;
      byMonth.set(key, month);
    }

    const thisMonth = byMonth.get(monthKey(now))?.visitors ?? 0;
    const lastMonth = byMonth.get(monthKey(months[CHART_MONTHS - 2]))?.visitors ?? 0;
    const today = allDays.find((d) => d.id === dayKey(now));

    return NextResponse.json({
      visitors: {
        total: totalVisitors,
        thisMonth,
        lastMonth,
        today: today?.visitors ?? 0,
        // null when there's nothing to compare against yet
        changePercent: lastMonth ? Math.round(((thisMonth - lastMonth) / lastMonth) * 100) : null,
      },
      pageViews: { total: totalPageViews, today: today?.pageViews ?? 0 },
      projects: { total: projects, thisMonth: projectsThisMonth },
      achievements: { total: achievements, thisMonth: achievementsThisMonth },
      messages: { total: messages.length, unread: messages.filter((m) => !m.read).length },
      chart: months.map((m) => ({
        label: m.toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
        visitors: byMonth.get(monthKey(m))?.visitors ?? 0,
        pageViews: byMonth.get(monthKey(m))?.pageViews ?? 0,
      })),
    });
  } catch (error) {
    console.error("Error loading dashboard stats:", error);
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
