// Title and author search. Both sides are lower-cased with the visitor's language so the comparison ignores capitals.
function normalize(text) {
  return text.toLocaleLowerCase(navigator.language);
}

export function searchBooks(books, query) {
  const q = normalize(query.trim());
  if (!q) return [];
  return books.filter((b) => normalize(`${b.title} ${b.author}`).includes(q));
}
