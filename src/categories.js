// The server stores categories under upper-case keys (e.g. "FICTION").
// Turn a URL slug into that key, using the visitor's language so the
// formatting matches the rest of the localised UI.
export function categoryKey(slug) {
  return slug.toLocaleUpperCase(navigator.language);
}
