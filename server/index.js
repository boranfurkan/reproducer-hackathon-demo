import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BOOKS, CATEGORIES } from "./data.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");

app.get("/api/categories", (_req, res) => {
  res.json(CATEGORIES);
});

// GET /api/books?category=FICTION  (category keys are upper case)
app.get("/api/books", (req, res) => {
  const { category } = req.query;
  res.json(category ? BOOKS.filter((b) => b.category === category) : BOOKS);
});

app.get("/api/books/:id", (req, res) => {
  const book = BOOKS.find((b) => b.id === Number(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// Reservations are kept in memory. pickupDate is a plain date (YYYY-MM-DD).
const reservations = [];
app.post("/api/reservations", (req, res) => {
  const { bookId, pickupDate } = req.body ?? {};
  if (!BOOKS.some((b) => b.id === bookId)) return res.status(404).json({ error: "Book not found" });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(pickupDate ?? "")) return res.status(400).json({ error: "Pick a pickup date" });
  const reservation = { id: reservations.length + 1, bookId, pickupDate };
  reservations.push(reservation);
  res.status(201).json(reservation);
});

app.use(express.static(dist));
app.use((_req, res) => res.sendFile(path.join(dist, "index.html")));

app.listen(PORT, () => console.log(`Pagefold Books listening on http://localhost:${PORT}`));
