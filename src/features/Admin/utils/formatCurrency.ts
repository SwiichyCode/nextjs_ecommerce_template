const currencySymbols: Record<string, string> = {
  USD: "$", // Dollar américain
  EUR: "€", // Euro
  JPY: "¥", // Yen japonais
  GBP: "£", // Livre sterling
  AUD: "A$", // Dollar australien
  CAD: "C$", // Dollar canadien
  CHF: "CHF", // Franc suisse
  CNY: "¥", // Yuan chinois
  SEK: "kr", // Couronne suédoise
  NZD: "NZ$", // Dollar néo-zélandais
};

export function formatCurrency(currency: string) {
  return currencySymbols[currency] ?? currency;
}
