import { basketFromUrl, placeOrder, totalOf } from "./order.js";

const items = basketFromUrl();
const summary = document.getElementById("summary");
const money = (pence) => `£${(pence / 100).toFixed(2)}`;
for (const i of items) {
  const li = document.createElement("li");
  li.innerHTML = `<span>${i.title} × ${i.qty}</span><span>${money(i.qty * i.price)}</span>`;
  summary.append(li);
}
const total = document.createElement("li");
total.innerHTML = `<strong>Total</strong><strong>${money(totalOf(items))}</strong>`;
summary.append(total);

const form = document.getElementById("checkout");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";
  const email = form.elements.email.value.trim();
  Analytics.identify(email);
  Analytics.track("checkout_submitted", { total: totalOf(items) });
  try {
    const order = await placeOrder(email, items);
    document.getElementById("order-id").textContent = order.id;
    form.hidden = true;
    document.getElementById("confirmation").hidden = false;
  } catch (e) {
    message.textContent = e.message;
  }
});
