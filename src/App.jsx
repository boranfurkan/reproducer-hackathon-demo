import { useEffect, useState } from "react";
import { fetchBooks, fetchCategories } from "./api.js";
import { categoryKey } from "./categories.js";

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash || "#/");
  useEffect(() => {
    const onChange = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

function Home() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);
  return (
    <section>
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
            <p className="price">£{b.price.toFixed(2)}</p>
            <button onClick={() => onAdd(b)}>Add to cart</button>
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

  return (
    <>
      <header>
        <a href="#/" className="brand">Pagefold Books</a>
        <span data-testid="cart-count">Cart ({cart.length})</span>
      </header>
      <main>
        {match ? (
          <CategoryPage slug={decodeURIComponent(match[1])} onAdd={(b) => setCart((c) => [...c, b])} />
        ) : (
          <Home />
        )}
      </main>
    </>
  );
}
