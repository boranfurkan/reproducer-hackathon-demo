import { money } from "./money.js";

const html = htm.bind(React.createElement);

export function Basket({ items, onRemove }) {
  if (items.length === 0) {
    return html`<section className="basket" id="basket" data-testid="basket"><p className="muted">Your basket is empty.</p></section>`;
  }
  return html`
    <section className="basket" id="basket" data-testid="basket">
      <h2>Your basket</h2>
      <ul>
        ${items.map(
          (i) => html`
            <li key=${i.id} data-testid="basket-line">
              <span>${i.title} × ${i.qty}</span>
              <span>
                <span className="price">${money(i.qty * i.price)}</span>
                <button data-testid=${`remove-${i.id}`} onClick=${() => onRemove(i.id)}>Remove</button>
              </span>
            </li>
          `,
        )}
      </ul>
    </section>
  `;
}
