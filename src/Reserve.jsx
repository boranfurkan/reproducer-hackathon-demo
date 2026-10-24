import { useEffect, useState } from "react";
import { createReservation, fetchBook } from "./api.js";
import { formatDay } from "./format.js";

export default function Reserve({ bookId }) {
  const [book, setBook] = useState(null);
  const [date, setDate] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBook(bookId).then(setBook);
  }, [bookId]);

  async function submit(e) {
    e.preventDefault();
    setError("");
    const res = await createReservation(bookId, date);
    if (res.error) setError(res.error);
    else setResult(res);
  }

  if (!book) return <p>Loading…</p>;
  if (result) {
    return (
      <section>
        <h1>Reserved</h1>
        <p data-testid="confirmation">
          {book.title} will be waiting for you on {formatDay(result.pickupDate)}.
        </p>
        <a href="#/">Back to the shop</a>
      </section>
    );
  }
  return (
    <section>
      <a href="#/">← All categories</a>
      <h1>Reserve “{book.title}”</h1>
      <form onSubmit={submit}>
        <label>
          Pickup date <input type="date" value={date} onChange={(e) => setDate(e.target.value)} data-testid="pickup-date" required />
        </label>
        <button type="submit" data-testid="reserve-button">Reserve</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
