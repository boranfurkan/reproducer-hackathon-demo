// The server stores categories under upper-case keys (e.g. "FICTION").
// Turn a URL slug into that ASCII key regardless of the visitor's locale.
export function categoryKey(slug) {
  return slug.toUpperCase();
}
