import { copy, last, newId } from "/vendor/tiny-ids@1.4.2/tiny-ids.js";

// Alpine component for the reading list. The list is loaded from the server; changes are kept on the page
// with an undo history.
window.readingList = function readingList() {
  return {
    items: [],
    history: [],
    draft: "",
    sessionId: newId("session-"),
    get latest() {
      return last(this.items);
    },
    async load() {
      this.items = await (await fetch("/api/reading-list")).json();
    },
    snapshot() {
      this.history.push(copy(Alpine.raw(this.items)));
    },
    add() {
      const title = this.draft.trim();
      if (!title) return;
      this.snapshot();
      this.items.push({ id: newId(), title, done: false });
      this.draft = "";
    },
    toggle(item) {
      this.snapshot();
      item.done = !item.done;
    },
    undo() {
      const previous = this.history.pop();
      if (previous) this.items = previous;
    },
  };
};
