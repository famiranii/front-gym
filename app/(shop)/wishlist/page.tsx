"use client";

import ProductCard from "@/components/ui/ProductCard";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  fetchWishlist,
  removeFromWishlist,
} from "@/store/slices/wishlistSlice";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const dispatch = useAppDispatch();

  const wishList = useAppSelector((state) => state.wishlist.items);

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleDeleteClick = (productId: string) => {
    setSelectedProductId(productId);
    setDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setSelectedProductId(null);
  };

  const handleConfirmDelete = () => {
    if (!selectedProductId) return;

    dispatch(removeFromWishlist(selectedProductId));

    setDeleteModalOpen(false);
    setSelectedProductId(null);
  };

  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              علاقه‌مندی‌ها
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              محصولاتی که ذخیره کرده‌اید
            </p>
          </div>

          {wishList.length > 0 && (
            <span className="rounded-full bg-muted px-4 py-2 text-sm font-medium">
              {wishList.length} محصول
            </span>
          )}
        </div>

        {/* Empty state */}
        {wishList.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed bg-card px-6 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <span
                className="material-symbols-outlined text-4xl text-muted-foreground"
                style={{
                  fontVariationSettings: "'FILL' 0",
                }}
              >
                favorite
              </span>
            </div>

            <h2 className="text-xl font-semibold">
              هنوز محصولی در علاقه‌مندی‌ها ندارید
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              محصولاتی که دوست دارید را به علاقه‌مندی‌ها اضافه کنید تا بعداً
              سریع‌تر به آن‌ها دسترسی داشته باشید.
            </p>
          </div>
        ) : (
          /* Products */
          <div className="mt-20 flex flex-wrap justify-center gap-5 m-8">
            {wishList.map((product) => (
              <div key={product.id} className="relative shrink-0 max-w-76 mx-5">
                <Link href={`/product/${product.name}?id=${product.id}`}>
                  <ProductCard product={product} />
                </Link>

                <button
                  type="button"
                  onClick={() => handleDeleteClick(product.id)}
                  className="absolute left-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-destructive text-destructive-foreground shadow-md transition-opacity hover:opacity-90"
                  aria-label="حذف محصول"
                >
                  <span className="material-symbols-outlined text-[19px]">
                    delete
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        open={deleteModalOpen}
        title="حذف از علاقه‌مندی‌ها"
        description="آیا مطمئن هستید که می‌خواهید این محصول را از علاقه‌مندی‌های خود حذف کنید؟"
        confirmText="حذف"
        cancelText="انصراف"
        variant="danger"
        icon="delete"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </main>
  );
}
