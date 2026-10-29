// Visitors counted before tracking was added; the dashboard total starts here.
export const INITIAL_VISITORS = 111;

// Cookie that marks a browser as already counted as a visitor
export const VISITOR_COOKIE = "pv_vid";

// Crawlers and link-preview bots shouldn't count as visitors
export const BOT_PATTERN =
  /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|headless|lighthouse|vercel|monitor/i;

// UTC day key, e.g. "2026-10-29"; also the dailyVisits document id
export const dayKey = (date: Date) => date.toISOString().slice(0, 10);

export const monthKey = (date: Date) => date.toISOString().slice(0, 7);
