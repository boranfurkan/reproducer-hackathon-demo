import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BOOKS, CATEGORIES } from "./data.js";

const app = express();
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

app.use(express.static(dist));
app.use((_req, res) => res.sendFile(path.join(dist, "index.html")));

app.listen(PORT, () => console.log(`Pagefold Books listening on http://localhost:${PORT}`));
