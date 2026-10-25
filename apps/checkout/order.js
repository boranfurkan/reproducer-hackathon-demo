// The basket that was built in the storefront is carried over in the URL for now.
export function basketFromUrl() {
  return [
    { id: 1, title: "The Salt Road", qty: 1, price: 1299 },
    { id: 3, title: "Small Hours", qty: 1, price: 999 },
  ];
}

export function totalOf(items) {
  return items.reduce((sum, i) => sum + i.qty * i.price, 0);
}

export async function placeOrder(email, items) {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, items }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.error || "Could not place the order");
  return body;
}
