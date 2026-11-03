// Simple fixed-window rate limiter kept in memory. On serverless hosts each
// instance has its own memory, so this is a speed bump for bots, not a hard
// guarantee; the contact route also checks recent messages in the database.

type Window = { count: number; resetAt: number };
const windows = new Map<string, Window>();

/** Returns true if this key may make another request now */
export function allow(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  // Drop expired entries now and then so the map can't grow without bound
  if (windows.size > 5000) {
    for (const [k, w] of windows) if (w.resetAt <= now) windows.delete(k);
  }
  const w = windows.get(key);
  if (!w || w.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (w.count >= limit) return false;
  w.count++;
  return true;
}

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for) */
export function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
