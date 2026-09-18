"use client";

import ConfirmModal from "@/components/ui/ConfirmModal";
import PriceComponent from "@/components/ui/PriceComponent";
import QuantityBtns from "@/components/ui/QuantityBtns";
import { getImageUrl } from "@/lib/getImageUrl";
import { useAppDispatch } from "@/store/hook";
import {
  removeCartItemApi,
  updateCartQuantityApi,
} from "@/store/slices/cartSlice";
import { GetMeApi } from "@/store/slices/getMeSlice";
import { CartItemType } from "@/types/cartTypes";
import { useState } from "react";
import { toast } from "sonner";

export default function CartItem({
  item,
}: {
  item: CartItemType;
}) {

  const dispatch = useAppDispatch();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deliting, setDeliting] = useState(false);

  const handleRemove = async () => {
    setDeliting(true);

    try {
      await dispatch(removeCartItemApi(item.id)).unwrap();

      dispatch(GetMeApi());

      setConfirmOpen(false);

      toast.success("محصول از سبد خرید حذف شد");
    } catch (error) {
      console.log("Remove cart item error:", error);

      toast.error("حذف محصول از سبد خرید انجام نشد");
    } finally {
      setDeliting(false);
    }
  };

  return (
    <>
      <div
        className="
          w-full
          rounded-2xl
          border border-border
          bg-card
          p-3
          sm:p-4
          transition-all
          duration-200
          hover:shadow-sm
        "
      >
        {/* ================= TOP ================= */}
        <div className="flex gap-3 sm:gap-4">
          {/* Image */}
          <div
            className="
              h-24 w-24
              sm:h-28 sm:w-28
              md:h-32 md:w-32
              shrink-0
              overflow-hidden
              rounded-xl
              bg-muted
            "
          >
            {item.image_url ? (
              <img
                src={getImageUrl(item.image_url)}
                alt={item.name}
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-300
                  hover:scale-105
                "
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
          <div className="min-w-0 flex-1">
            {/* Name + Delete */}
            <div className="flex items-start justify-between gap-2">
              <h3
                className="
                  line-clamp-2
                  text-sm
                  sm:text-base
                  font-bold
                  leading-6
                  text-foreground
                "
              >
                {item.name}
              </h3>

              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="
                  flex
                  h-8 w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-muted-foreground
                  transition-colors
                  hover:bg-destructive/10
                  hover:text-destructive
                "
                aria-label="حذف محصول"
              >
                <span className="material-symbols-outlined text-[19px]">
                  delete
                </span>
              </button>
            </div>

            {/* Variants */}
            <div
              className="
                mt-2
                flex
                flex-wrap
                items-center
                gap-x-2
                gap-y-1.5
                text-[11px]
                sm:text-xs
                text-muted-foreground
              "
            >
              {/* Size */}
              <span className="flex items-center gap-1">
                <span>سایز:</span>
                <span className="font-medium text-foreground">
                  {item.label}
                </span>
              </span>

              <span className="text-border">•</span>

              {/* Color */}
              <span className="flex items-center gap-1.5">
                <span>رنگ:</span>

                <span
                  className="
                    h-3.5
                    w-3.5
                    rounded-full
                    border
                    border-border
                    shadow-sm
                  "
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              </span>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            gap-3
            border-t
            border-border/60
            pt-3
            sm:mt-4
            sm:pt-4
          "
        >
          {/* Quantity */}
          <div className="shrink-0">
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
          </div>

          {/* Price */}
          <div className="min-w-0 text-left">
            <PriceComponent
              price={item.price}
              final_price={item.final_price}
              discount={item.discount}
            />
          </div>
        </div>
      </div>

      {/* ================= CONFIRM MODAL ================= */}
      <ConfirmModal
        open={confirmOpen}
        variant="danger"
        icon="delete_sweep"
        title="حذف محصول از سبد خرید"
        description="این محصول از سبد خرید شما حذف شود؟"
        confirmText="حذف"
        cancelText="انصراف"
        loading={deliting}
        onConfirm={handleRemove}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
