/**
 * Normalize SQLite timestamp to a proper Date object.
 * SQLite CURRENT_TIMESTAMP returns "YYYY-MM-DD HH:MM:SS" (UTC, no T, no Z).
 * This converts it to ISO format so new Date() parses it as UTC correctly.
 */
function normalizeTimestamp(dateStr: string): Date {
  const normalized = dateStr.includes("T")
    ? dateStr
    : dateStr.replace(" ", "T") + "Z";
  return new Date(normalized);
}

/** Format as time only: "2:30 PM" */
export function formatTime(dateStr: string): string {
  const date = normalizeTimestamp(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/** Format as date + time for sidebar: "Today, 2:30 PM" or "Feb 24, 2:30 PM" */
export function formatDateTime(dateStr: string): string {
  const date = normalizeTimestamp(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const now = new Date();
  const isToday = date.toLocaleDateString() === now.toLocaleDateString();

  const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (isToday) return `Today, ${time}`;

  const day = date.toLocaleDateString([], { month: "short", day: "numeric" });
  return `${day}, ${time}`;
}
