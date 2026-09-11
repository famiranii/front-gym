export function formatPrice(price: number) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}
