export const BOOKS = [
  { id: 1, title: "The Salt Road", author: "Imogen Hale", price: 1299, category: "FICTION" },
  { id: 2, title: "A Field Guide to Lighthouses", author: "Tomas Reyes", price: 1850, category: "NATURE" },
  { id: 3, title: "Small Hours", author: "Priya Menon", price: 999, category: "FICTION" },
  { id: 4, title: "Ink and Ember", author: "Callum Broadhurst", price: 1450, category: "FANTASY" },
  { id: 5, title: "The Quiet Orchard", author: "Mirela Costin", price: 1175, category: "NATURE" },
  { id: 6, title: "Letters from the Tideline", author: "Aoife Brennan", price: 1325, category: "FICTION" },
];

export const ORDERS = [
  { id: "PF-1042", placedAt: "2026-10-02", status: "Delivered", total: 2298, items: [{ title: "The Salt Road", qty: 1 }, { title: "Small Hours", qty: 1 }] },
  { id: "PF-1057", placedAt: "2026-10-14", status: "Shipped", total: 1850, items: [{ title: "A Field Guide to Lighthouses", qty: 1 }] },
  { id: "PF-1063", placedAt: "2026-10-21", status: "Processing", total: 2625, items: [{ title: "Ink and Ember", qty: 1 }, { title: "The Quiet Orchard", qty: 1 }] },
];

// The Midnight Reading Marathon: six one-hour sessions through the night of 24 to 25 October,
// each stored as an exact instant (UTC). Capacity is per session.
export const EVENT = {
  id: "midnight-marathon",
  title: "Midnight Reading Marathon",
  venue: "Pagefold Books, Leith Walk",
  date: "2026-10-25",
  sessions: [
    { startsAt: "2026-10-24T23:00:00Z", seats: 12 },
    { startsAt: "2026-10-25T00:00:00Z", seats: 12 },
    { startsAt: "2026-10-25T01:00:00Z", seats: 12 },
    { startsAt: "2026-10-25T02:00:00Z", seats: 12 },
    { startsAt: "2026-10-25T03:00:00Z", seats: 12 },
    { startsAt: "2026-10-25T04:00:00Z", seats: 12 },
  ],
};

export const READING_LIST = [
  { id: "seed-1", title: "The Salt Road", done: false },
  { id: "seed-2", title: "Small Hours", done: true },
];
