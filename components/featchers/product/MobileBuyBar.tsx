"use client";

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

export default function MobileBuyBar({
  price,
  onBuy,
}: {
  price: number;
  onBuy: () => void;
}) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 flex items-center gap-3 shadow-[0_-8px_24px_rgba(0,0,0,0.07)] z-50">
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">قیمت</span>
        <span className="text-base font-extrabold text-foreground">
          {formatPrice(price)}
          <span className="text-xs font-normal mr-1">تومان</span>
        </span>
      </div>
      <button
        onClick={onBuy}
        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-secondary text-secondary-foreground text-sm font-bold hover:opacity-90 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-base leading-none">shopping_bag</span>
        خرید
      </button>
    </div>
  );
}
