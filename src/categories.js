// The server stores categories under upper-case ASCII keys (e.g. "FICTION").
// Turn a URL slug into that key using locale-independent ASCII upper-casing.
export function categoryKey(slug) {
  return slug.toUpperCase();
}
