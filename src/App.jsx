import { useEffect, useState } from "react";
import { fetchAllBooks, fetchBooks, fetchCategories } from "./api.js";
import { categoryKey } from "./categories.js";
import { formatPrice } from "./format.js";
import { searchBooks } from "./search.js";
import Reserve from "./Reserve.jsx";

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash || "#/");
  useEffect(() => {
    const onChange = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

function Search() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetchAllBooks().then(setBooks);
  }, []);
  const results = searchBooks(books, query);
  return (
    <section>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title or author"
        data-testid="search-input"
        aria-label="Search books"
      />
      {query.trim() && results.length === 0 && <p data-testid="search-empty">No books match “{query}”.</p>}
      <ul className="results">
        {results.map((b) => (
          <li key={b.id} data-testid="search-result">
            {b.title} <span className="muted">by {b.author}</span>{" "}
            <a href={`#/reserve/${b.id}`}>Reserve for pickup</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Home() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);
  return (
    <section>
      <Search />
      <h1>Browse by category</h1>
      <ul className="categories">
        {categories.map((c) => (
          <li key={c.key}>
            <a href={`#/category/${c.slug}`} data-testid={`category-${c.slug}`}>
              {c.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CategoryPage({ slug, onAdd }) {
  const [books, setBooks] = useState(null);
  useEffect(() => {
    setBooks(null);
    fetchBooks(categoryKey(slug)).then(setBooks);
  }, [slug]);

  return (
    <section>
      <a href="#/">← All categories</a>
      <h1 data-testid="category-title">{slug}</h1>
      {books === null && <p>Loading…</p>}
      {books && books.length === 0 && <p>No books in this category yet.</p>}
      <div className="grid">
        {(books ?? []).map((b) => (
          <article key={b.id} className="card" data-testid="book-card">
            <h2>{b.title}</h2>
            <p>{b.author}</p>
            <p className="price">{formatPrice(b.price)}</p>
            <button onClick={() => onAdd(b)}>Add to cart</button>{" "}
            <a href={`#/reserve/${b.id}`} data-testid="reserve-link">Reserve for pickup</a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const hash = useHashRoute();
  const [cart, setCart] = useState([]);
  const match = hash.match(/^#\/category\/(.+)$/);
  const reserve = hash.match(/^#\/reserve\/(\d+)$/);

  return (
    <>
      <header>
        <a href="#/" className="brand">Pagefold Books</a>
        <span data-testid="cart-count">Cart ({cart.length})</span>
      </header>
      <main>
        {reserve ? (
          <Reserve bookId={reserve[1]} />
        ) : match ? (
          <CategoryPage slug={decodeURIComponent(match[1])} onAdd={(b) => setCart((c) => [...c, b])} />
        ) : (
          <Home />
        )}
      </main>
    </>
  );
}
