import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface HasPrice {
  price: number;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export function subtotal<T extends HasPrice>(items: T[]): number {
  return items.reduce((acc, item) => acc + item.price, 0);
}
