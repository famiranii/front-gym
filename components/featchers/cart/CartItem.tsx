import { useAppDispatch } from "@/store/hook";
import { removeFromCart, updateCartQuantity } from "@/store/slices/cartSlice";
import { CartItmeType } from "@/types/cartTypes";

export default function CartItem({ item }: { item: CartItmeType }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const dispatch = useAppDispatch();
  const handleIncrease = (id: string, quantity: number) => {
    dispatch(
      updateCartQuantity({
        id,
        quantity: quantity + 1,
      }),
    );
  };

  const handleDecrease = (id: string, quantity: number) => {
    if (quantity <= 1) return;

    dispatch(
      updateCartQuantity({
        id,
        quantity: quantity - 1,
      }),
    );
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div
      key={item.id}
      className="flex gap-4 rounded-2xl border border-border bg-card p-4"
    >
      {/* Image */}
      <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-muted">
        {item.image_url ? (
          <img
            src={apiUrl + item.image_url}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-muted-foreground">
              image
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="line-clamp-2 font-bold text-foreground">
              {item.name}
            </h3>

            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <span>سایز: {item.label}</span>

              <span>•</span>

              <span className="flex items-center gap-1">
                رنگ:
                <span
                  className="h-3.5 w-3.5 rounded-full border border-border"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleRemove(item.id)}
            className="shrink-0 text-muted-foreground transition hover:text-destructive"
            aria-label="حذف محصول"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          {/* Quantity */}
          <div className="flex items-center overflow-hidden rounded-xl border border-border">
            <button
              type="button"
              onClick={() => handleDecrease(item.id, item.quantity)}
              disabled={item.quantity <= 1}
              className="flex h-9 w-9 items-center justify-center text-muted-foreground transition hover:bg-muted disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-lg">remove</span>
            </button>

            <span className="flex h-9 min-w-10 items-center justify-center border-x border-border px-2 text-sm font-bold">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => handleIncrease(item.id, item.quantity)}
              className="flex h-9 w-9 items-center justify-center text-muted-foreground transition hover:bg-muted"
            >
              <span className="material-symbols-outlined text-lg">add</span>
            </button>
          </div>

          {/* Price */}
          <div className="text-left flex flex-col items-end gap-0.5">
            {/* قیمت نهایی */}
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold text-foreground">
                {item.final_price.toLocaleString("fa-IR")}
              </span>

              <span className="text-xs text-muted-foreground">تومان</span>
            </div>

            {/* قیمت قبل از تخفیف */}
            {item.discount > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground line-through">
                  {item.price.toLocaleString("fa-IR")}
                </span>

                <span className="rounded-full bg-destructive/10 px-1.5 py-0.5 text-[10px] font-bold text-destructive">
                  {item.discount}٪
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
