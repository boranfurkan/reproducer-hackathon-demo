// Small helpers for showing times to visitors, in their own timezone.

const hhmm = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" });

export function timeLabel(date) {
  return hhmm.format(date);
}

// Sessions are shown as one button per start time, so a list of instants is collapsed to one entry per time label.
export function byStartTime(sessions) {
  const buckets = new Map();
  for (const s of sessions) {
    buckets.set(timeLabel(new Date(s.startsAt)), s);
  }
  return [...buckets.values()];
}
