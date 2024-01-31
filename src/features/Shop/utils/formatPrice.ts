export function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export function formatPriceCents(price: number) {
  return `$${(price / 100).toFixed(2)}`;
}
