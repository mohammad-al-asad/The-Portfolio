// Small date helpers, replacing moment (about 70 KB) for the few places that need them

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 24 * 3600],
  ["month", 30 * 24 * 3600],
  ["week", 7 * 24 * 3600],
  ["day", 24 * 3600],
  ["hour", 3600],
  ["minute", 60],
];

/** How long ago, without "ago": "5 minutes", "2 days", "just now" */
export function timeSince(date: Date | string): string {
  const seconds = Math.max(0, (Date.now() - new Date(date).getTime()) / 1000);
  for (const [unit, size] of UNITS) {
    const n = Math.floor(seconds / size);
    if (n >= 1) return `${n} ${unit}${n > 1 ? "s" : ""}`;
  }
  return "just now";
}

/** "Nov 3, 2026" */
export const formatDate = (date: Date | string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

/** "4:30 PM" */
export const formatTime = (date: Date | string) =>
  new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
