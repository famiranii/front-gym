import PriceComponent from "@/components/ui/PriceComponent";
import QuantityBtns from "@/components/ui/QuantityBtns";
import { useAppDispatch } from "@/store/hook";
import {
  removeCartItemApi,
  updateCartQuantityApi,
} from "@/store/slices/cartSlice";
import { CartItemType } from "@/types/cartTypes";

export default function CartItem({ item }: { item: CartItemType }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const dispatch = useAppDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeCartItemApi(id));
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
          <QuantityBtns
            quantity={item.quantity}
            stock={item.stock}
            onChange={(value) =>
              dispatch(
                updateCartQuantityApi({
                  id: item.id,
                  quantity: value,
                }),
              )
            }
          />
          {/* Price */}
          <PriceComponent
            price={item.price}
            final_price={item.final_price}
            discount={item.discount}
          />
        </div>
      </div>
    </div>
  );
}
