import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BOOKS, EVENT, ORDERS, READING_LIST } from "./data.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

app.post("/api/collect", (_req, res) => res.status(204).end());

app.get("/api/books", (_req, res) => res.json(BOOKS));

app.get("/api/orders", (_req, res) => res.json(ORDERS));

const placed = [];
app.post("/api/orders", (req, res) => {
  const { email, items } = req.body ?? {};
  if (!/^\S+@\S+$/.test(email ?? "")) return res.status(400).json({ error: "Enter a valid email" });
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: "Your basket is empty" });
  const order = { id: `PF-${2000 + placed.length}`, email, items };
  placed.push(order);
  res.status(201).json(order);
});

app.get("/api/events/:date", (req, res) => {
  if (req.params.date !== EVENT.date) return res.status(404).json({ error: "No event on that date" });
  res.json(EVENT);
});

const bookings = [];
app.post("/api/events/:date/bookings", (req, res) => {
  const { startsAt, name } = req.body ?? {};
  const session = EVENT.sessions.find((s) => s.startsAt === startsAt);
  if (!session) return res.status(409).json({ error: "That session is not available" });
  if (!name) return res.status(400).json({ error: "Enter your name" });
  bookings.push({ startsAt, name });
  res.status(201).json({ id: bookings.length, startsAt, name });
});

app.get("/api/reading-list", (_req, res) => res.json(READING_LIST));

app.use("/apps", express.static(path.join(root, "apps"), { extensions: ["html"] }));
app.use("/vendor", express.static(path.join(root, "vendor")));
app.use("/shared", express.static(path.join(root, "shared")));
app.use("/lib", express.static(path.join(root, "lib")));
app.use("/static", express.static(path.join(root, "static")));
app.get("/", (_req, res) => res.sendFile(path.join(root, "index.html")));

app.listen(PORT, () => console.log(`Pagefold Books listening on http://localhost:${PORT}`));
