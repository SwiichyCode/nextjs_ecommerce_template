type HasPrice = {
  price: number;
  quantity?: number;
};

export function subTotal<T extends HasPrice>(items: T[]): number {
  return items.reduce((acc, item) => acc + item.price * item.quantity!, 0);
}
