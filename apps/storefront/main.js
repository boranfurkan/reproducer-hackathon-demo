import { Basket } from "./Basket.js";
import { CartSummary } from "./CartSummary.js";
import { money } from "./money.js";

const html = htm.bind(React.createElement);
const { useEffect, useState } = React;

function App() {
  const [books, setBooks] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/books").then((r) => r.json()).then(setBooks);
  }, []);

  const add = (book) =>
    setItems((cur) => {
      const found = cur.find((i) => i.id === book.id);
      return found ? cur.map((i) => (i.id === book.id ? { ...i, qty: i.qty + 1 } : i)) : [...cur, { ...book, qty: 1 }];
    });
  const remove = (id) => setItems((cur) => cur.filter((i) => i.id !== id));

  return html`
    <div>
      <header className="site">
        <h1>Pagefold Books</h1>
        <${CartSummary} items=${items} onOpen=${() => document.getElementById("basket")?.scrollIntoView()} />
      </header>
      <main>
        <div className="grid" data-testid="book-grid">
          ${books.map(
            (b) => html`
              <article className="card" key=${b.id} data-testid="book-card">
                <strong>${b.title}</strong>
                <span className="muted">${b.author}</span>
                <span className="price">${money(b.price)}</span>
                <button className="primary" data-testid=${`add-${b.id}`} onClick=${() => add(b)}>Add to basket</button>
              </article>
            `,
          )}
        </div>
        <${Basket} items=${items} onRemove=${remove} />
      </main>
    </div>
  `;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
