import { prefs } from "./prefs.js";

export function formatPrice(amount) {
  return new Intl.NumberFormat(navigator.language, { style: "currency", currency: prefs.currency }).format(amount);
}

// Pickup dates are stored as plain dates (YYYY-MM-DD) and shown in the visitor's language.
export function formatDay(isoDate) {
  return new Date(isoDate).toLocaleDateString(navigator.language, { weekday: "long", day: "numeric", month: "long" });
}
