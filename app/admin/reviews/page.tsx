"use client";

import ReviewCard from "@/components/featchers/product/ReviewCard";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { api } from "@/lib/api";
import { getImageUrl } from "@/lib/getImageUrl";
import { ReviewType } from "@/types/reviewsType";
import { useEffect, useRef, useState } from "react";

interface Product {
  id: string;
  name: string;
  primary_image?: string;
}

interface DeleteModal {
  open: boolean;
  reviewId: number | null;
  loading: boolean;
}

export default function Page() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [pendingReviews, setPendingReviews] = useState<ReviewType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [q, setQ] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState<DeleteModal>({
    open: false,
    reviewId: null,
    loading: false,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  // ─── Fetch pending reviews on mount ────────────────────────────────────────

  useEffect(() => {
    const fetchPending = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await api.get<ReviewType[]>("/admin/reviews/pending");
        setPendingReviews(data);
        setReviews(data);
      } catch {
        setError("دریافت نظرات انجام نشد.");
      } finally {
        setLoading(false);
      }
    };

    fetchPending();
  }, []);

  // ─── Product search with debounce ──────────────────────────────────────────

  useEffect(() => {
    const search = q.trim();

    if (search.length < 2 || selectedProduct?.name === search) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSearchLoading(true);

        const data = await api.get<Product[]>(
          `/products/search?q=${encodeURIComponent(search)}&limit=10&offset=0`,
        );

        setProducts(data);
        setShowDropdown(data.length > 0);
      } catch {
        setProducts([]);
        setShowDropdown(false);
      } finally {
        setSearchLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [q, selectedProduct]);

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handleSelectProduct = async (product: Product) => {
    try {
      setSelectedProduct(product);
      setQ(product.name);
      setShowDropdown(false);
      setLoading(true);
      setError("");
      const data = await api.get<ReviewType[]>(
        `/products/${product.id}/reviews`,
      );
      setReviews(data);
    } catch {
      setReviews([]);
      setError("دریافت نظرات محصول انجام نشد.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearProduct = () => {
    setSelectedProduct(null);
    setQ("");
    setProducts([]);
    setShowDropdown(false);
    setReviews(pendingReviews);
    inputRef.current?.focus();
  };

  const removeReview = (id: number) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setPendingReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const handleApprove = async (id: number) => {
    try {
      await api.patch(`/admin/reviews/${id}/approve`);
      removeReview(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await api.patch(`/admin/reviews/${id}/reject`);
      removeReview(id);
    } catch (err) {
      console.error(err);
    }
  };

  const openDeleteModal = (id: number) => {
    setDeleteModal({ open: true, reviewId: id, loading: false });
  };

  const closeDeleteModal = () => {
    if (deleteModal.loading) return;
    setDeleteModal({ open: false, reviewId: null, loading: false });
  };

  const handleDelete = async () => {
    if (!deleteModal.reviewId) return;
    try {
      setDeleteModal((prev) => ({ ...prev, loading: true }));
      await api.delete(`/admin/reviews/${deleteModal.reviewId}`);
      removeReview(deleteModal.reviewId);
      setDeleteModal({ open: false, reviewId: null, loading: false });
    } catch {
      setDeleteModal((prev) => ({ ...prev, loading: false }));
    }
  };

  // ─── Early returns ─────────────────────────────────────────────────────────

  if (loading && !selectedProduct && reviews.length === 0) {
    return (
      <PageShell>
        <div className="h-8 w-52 animate-pulse rounded-lg bg-card" />
        <div className="mt-8 space-y-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-2xl border border-border bg-card"
            />
          ))}
        </div>
      </PageShell>
    );
  }

  if (error && !selectedProduct) {
    return (
      <PageShell>
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
          <span className="material-symbols-outlined text-3xl text-destructive">
            error
          </span>
          <p className="mt-2 text-sm text-destructive">{error}</p>
        </div>
      </PageShell>
    );
  }

  // ─── Main render ───────────────────────────────────────────────────────────

  const displayCount = selectedProduct ? reviews.length : pendingReviews.length;

  return (
    <PageShell>
      <ConfirmModal
        open={deleteModal.open}
        loading={deleteModal.loading}
        variant="danger"
        icon="delete"
        title="حذف نظر"
        description="آیا از حذف این نظر مطمئن هستید؟ این عمل قابل بازگشت نیست."
        confirmText="حذف"
        cancelText="انصراف"
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              rate_review
            </span>
            <h1 className="text-2xl font-bold text-foreground">بررسی نظرات</h1>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            نظرات کاربران را قبل از انتشار بررسی و تایید کنید.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-auto sm:min-w-[280px]">
          <div className="flex h-10 items-center overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <input
              ref={inputRef}
              type="search"
              value={q}
              onChange={(e) => {
                const value = e.target.value;

                setQ(value);

                if (selectedProduct) {
                  setSelectedProduct(null);
                  setReviews(pendingReviews);
                }

                if (value.trim().length < 2) {
                  setProducts([]);
                  setShowDropdown(false);
                  setSearchLoading(false);
                }
              }}
              onFocus={() => products.length > 0 && setShowDropdown(true)}
              placeholder="جستجو در محصولات..."
              dir="rtl"
              className="min-w-0 flex-1 bg-transparent px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />

            <div className="flex h-10 w-10 shrink-0 items-center justify-center text-muted-foreground">
              {selectedProduct ? (
                <button
                  type="button"
                  onClick={handleClearProduct}
                  aria-label="حذف انتخاب"
                  className="flex h-full w-full items-center justify-center transition-colors hover:bg-muted hover:text-foreground"
                >
                  <span className="material-symbols-outlined text-[19px]">
                    close
                  </span>
                </button>
              ) : (
                <span
                  className={[
                    "material-symbols-outlined text-[19px]",
                    searchLoading ? "animate-spin" : "",
                  ].join(" ")}
                >
                  {searchLoading ? "progress_activity" : "search"}
                </span>
              )}
            </div>
          </div>

          {showDropdown && products.length > 0 && (
            <div className="absolute right-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-card shadow-xl">
              {products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleSelectProduct(product)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-right transition-colors hover:bg-muted"
                >
                  {product.primary_image ? (
                    <img
                      src={getImageUrl(product.primary_image)}
                      alt={product.name}
                      className="h-10 w-10 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <span className="material-symbols-outlined text-muted-foreground">
                        image
                      </span>
                    </div>
                  )}
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
                    {product.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Counter */}
        <div className="shrink-0 self-start rounded-xl border border-border bg-card px-4 py-2 sm:self-auto">
          <span className="text-sm text-muted-foreground">در انتظار بررسی</span>
          <span className="mr-2 font-semibold text-primary">
            {displayCount}
          </span>
        </div>
      </div>

      {/* Selected product banner */}
      {selectedProduct && (
        <div className="mt-6 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              inventory_2
            </span>
            <span className="truncate text-sm font-semibold text-foreground">
              نظرات محصول: {selectedProduct.name}
            </span>
          </div>
          <button
            type="button"
            onClick={handleClearProduct}
            className="shrink-0 text-xs text-muted-foreground hover:text-foreground"
          >
            بازگشت
          </button>
        </div>
      )}

      {/* Inline error */}
      {error && selectedProduct && (
        <div className="mt-6 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Reviews list */}
      {loading && selectedProduct ? (
        <div className="mt-8 space-y-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-2xl border border-border bg-card"
            />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-border bg-card px-6 py-16 text-center">
          <span className="material-symbols-outlined text-5xl text-muted-foreground/40">
            mark_email_read
          </span>
          <h2 className="mt-4 font-semibold text-foreground">
            {selectedProduct
              ? "نظری برای این محصول وجود ندارد"
              : "نظری برای بررسی وجود ندارد"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {selectedProduct
              ? "برای این محصول نظری برای بررسی پیدا نشد."
              : "همه نظرات بررسی شده‌اند."}
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <ReviewCard review={review} />

              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                {review.status === "pending" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleReject(review.id)}
                      className="flex h-8 items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 px-4 text-sm font-medium text-destructive transition-colors hover:bg-destructive hover:text-white"
                    >
                      <span className="material-symbols-outlined text-[19px]">
                        close
                      </span>
                      رد کردن
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApprove(review.id)}
                      className="flex h-8 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      <span className="material-symbols-outlined text-[19px]">
                        check
                      </span>
                      تایید
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => openDeleteModal(review.id)}
                    aria-label="حذف نظر"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      delete
                    </span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}

// ─── Layout wrapper ───────────────────────────────────────────────────────────

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </main>
  );
}
