import { money } from "./money.js";

const html = htm.bind(React.createElement);

// The header: how much is in the basket, and the button that scrolls to it.
export function CartSummary({ items, onOpen }) {
  const count = items.reduce((n, i) => n + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  return html`
    <div className="cart-summary" data-testid="cart-summary">
      ${count > 0 ? `${count} ${count === 1 ? "book" : "books"} · ${money(total)}` : null}
      <button data-testid="open-basket" onClick=${onOpen}>Basket</button>
    </div>
  `;
}
