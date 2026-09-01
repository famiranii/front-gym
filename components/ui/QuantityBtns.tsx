"use client";

type QuantitySelectorProps = {
  quantity: number;
  stock?: number;
  onChange: (quantity: number) => void;
};

export default function QuantityBtns({
  quantity,
  stock,
  onChange,
}: QuantitySelectorProps) {
  const decrease = () => {
    onChange(Math.max(1, quantity - 1));
  };

  const increase = () => {
    const maxStock = stock ?? quantity + 1;
    onChange(Math.min(maxStock, quantity + 1));
  };

  const isMax = stock !== undefined && quantity >= stock;

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-muted-foreground">
        تعداد
      </span>

      <div className="flex items-center gap-0 border border-border rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={decrease}
          disabled={quantity <= 1}
          className="px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-lg font-bold disabled:opacity-40"
        >
          −
        </button>

        <span className="px-4 py-2 text-sm font-bold text-foreground border-x border-border min-w-[2.5rem] text-center">
          {quantity}
        </span>

        <button
          type="button"
          onClick={increase}
          disabled={isMax}
          className="px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-lg font-bold disabled:opacity-40"
        >
          +
        </button>
      </div>

      {stock !== undefined && stock > 0 && stock <= 5 && (
        <span className="text-xs text-warning font-semibold">
          فقط {stock} عدد باقی‌مانده
        </span>
      )}
    </div>
  );
}