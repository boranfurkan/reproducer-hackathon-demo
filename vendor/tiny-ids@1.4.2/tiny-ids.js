/*! tiny-ids 1.4.2 | MIT | small unique ids and list helpers for browser apps */

/** A new unique id. Uses the platform's UUID generator. */
export function newId(prefix = "") {
  return prefix + crypto.randomUUID();
}

/** The last element of a list, or undefined. */
export function last(list) {
  return list.at(-1);
}

/** A deep copy of a plain value. */
export function copy(value) {
  return structuredClone(value);
}
