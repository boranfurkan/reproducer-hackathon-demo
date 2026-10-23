export async function fetchCategories() {
  const res = await fetch("/api/categories");
  return res.json();
}

export async function fetchBooks(categoryKey) {
  const res = await fetch(`/api/books?category=${encodeURIComponent(categoryKey)}`);
  return res.json();
}
