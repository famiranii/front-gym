export const getColorName = (hex:string) => {
  const value = hex.replace("#", "");

  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  // خاکستری / مشکی / سفید
  if (max - min < 15) {
    if (max < 40) return "مشکی";
    if (max < 100) return "خاکستری تیره";
    if (max < 180) return "خاکستری";
    if (max < 230) return "خاکستری روشن";
    return "سفید";
  }

  // رنگ‌های اصلی
  if (r > g * 1.5 && r > b * 1.5) return "قرمز";
  if (g > r * 1.5 && g > b * 1.5) return "سبز";
  if (b > r * 1.5 && b > g * 1.5) return "آبی";

  if (r > 180 && g > 120 && b < 100) return "نارنجی";
  if (r > 180 && g > 150 && b < 150) return "زرد";
  if (r > 150 && b > 120 && g < 120) return "صورتی";
  if (b > r && b > g) return "بنفش";
  if (g > r && b > r) return "فیروزه‌ای";

  return "رنگ ترکیبی";
};
