export async function fetchCategories() {
  const res = await fetch("/api/categories");
  return res.json();
}

export async function fetchBooks(categoryKey) {
  const res = await fetch(`/api/books?category=${encodeURIComponent(categoryKey)}`);
  return res.json();
}

export async function fetchBook(id) {
  const res = await fetch(`/api/books/${encodeURIComponent(id)}`);
  return res.json();
}

export async function createReservation(bookId, pickupDate) {
  const res = await fetch("/api/reservations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookId: Number(bookId), pickupDate }),
  });
  return res.json();
}
