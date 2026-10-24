// Display preferences (currency, compact cards) remembered between visits.
const KEY = "pagefold:prefs";

const stored = JSON.parse(localStorage.getItem(KEY) || "{}");

export const prefs = {
  currency: stored.currency || "GBP",
  compact: Boolean(stored.compact),
};

export function savePrefs(next) {
  Object.assign(prefs, next);
  localStorage.setItem(KEY, JSON.stringify(prefs));
}
