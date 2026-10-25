const { nextTick, onBeforeUnmount, onMounted, ref } = Vue;

// Slides in from the right. Closing plays the slide-out first and only then removes the drawer from the page.
export const OrderDrawer = {
  props: ["order"],
  emits: ["closed"],
  setup(props, { emit }) {
    const state = ref("entering");
    const panel = ref(null);

    onMounted(async () => {
      await nextTick();
      requestAnimationFrame(() => (state.value = "open"));
    });

    function finish() {
      emit("closed");
    }

    function close() {
      if (state.value === "closing") return;
      state.value = "closing";
      panel.value.addEventListener("transitionend", finish, { once: true });
    }

    const onKey = (e) => e.key === "Escape" && close();
    onMounted(() => document.addEventListener("keydown", onKey));
    onBeforeUnmount(() => document.removeEventListener("keydown", onKey));

    return { state, panel, close };
  },
  template: `
    <div class="drawer-root" :class="state" data-testid="drawer">
      <div class="backdrop" data-testid="backdrop" @click="close"></div>
      <aside class="drawer" ref="panel" role="dialog" aria-label="Order details">
        <h2>Order {{ order.id }}</h2>
        <p class="muted">Placed {{ order.placedAt }} · {{ order.status }}</p>
        <ul>
          <li v-for="item in order.items" :key="item.title">{{ item.title }} × {{ item.qty }}</li>
        </ul>
        <p><strong>Total £{{ (order.total / 100).toFixed(2) }}</strong></p>
        <button data-testid="close-drawer" @click="close">Close</button>
      </aside>
    </div>
  `,
};
