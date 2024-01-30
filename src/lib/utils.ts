import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number) {
  return (num / 100).toFixed(2).toLocaleString();
}

export function xor(a: boolean, b: boolean) {
  return a !== b;
}
