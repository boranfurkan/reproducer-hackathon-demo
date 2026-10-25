// Prices are stored in pence.
export const money = (pence) => `£${(pence / 100).toFixed(2)}`;
