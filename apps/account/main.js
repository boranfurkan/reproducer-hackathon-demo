import { OrderDrawer } from "./OrderDrawer.js";

const { createApp, onMounted, ref } = Vue;

createApp({
  components: { OrderDrawer },
  setup() {
    const orders = ref([]);
    const selected = ref(null);
    onMounted(async () => {
      orders.value = await (await fetch("/api/orders")).json();
    });
    return { orders, selected };
  },
  template: `
    <main>
      <h2>Your orders</h2>
      <table class="orders">
        <thead><tr><th>Order</th><th>Placed</th><th>Status</th><th></th></tr></thead>
        <tbody>
          <tr v-for="o in orders" :key="o.id" data-testid="order-row">
            <td>{{ o.id }}</td><td>{{ o.placedAt }}</td><td>{{ o.status }}</td>
            <td><button :data-testid="'view-' + o.id" @click="selected = o">View</button></td>
          </tr>
        </tbody>
      </table>
      <order-drawer v-if="selected" :order="selected" @closed="selected = null" />
    </main>
  `,
}).mount("#app");
