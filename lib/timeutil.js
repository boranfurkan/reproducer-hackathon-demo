// Small helpers for showing times to visitors, in their own timezone.

const hhmm = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" });

export function timeLabel(date) {
  return hhmm.format(date);
}

// Sessions are shown as one button per start instant, ordered by start time.
export function byStartTime(sessions) {
  const buckets = new Map();
  for (const s of sessions) {
    buckets.set(new Date(s.startsAt).getTime(), s);
  }
  return [...buckets.values()].sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));
}
