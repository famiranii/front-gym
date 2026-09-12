"use client";

import ReviewCard from "@/components/featchers/product/ReviewCard";
import { api } from "@/lib/api";
import { ReviewType } from "@/types/reviewsType";
import { useEffect, useState } from "react";

export default function Page() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getPendingReviews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<ReviewType[]>(
          "/admin/reviews/pending",
        );

        setReviews(response);
      } catch (error) {
        console.error(error);
        setError("دریافت نظرات انجام نشد.");
      } finally {
        setLoading(false);
      }
    };

    getPendingReviews();
  }, []);

  const handleApprove = async (reviewId: number) => {
    try {
      await api.patch(`/admin/reviews/${reviewId}/approve`);

      setReviews((prev) =>
        prev.filter((review) => review.id !== reviewId),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (reviewId: number) => {
    try {
      await api.patch(`/admin/reviews/${reviewId}/reject`);

      setReviews((prev) =>
        prev.filter((review) => review.id !== reviewId),
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-5xl">
          <div className="h-8 w-52 animate-pulse rounded-lg bg-card" />

          <div className="mt-8 space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-44 animate-pulse rounded-2xl border border-border bg-card"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
            <span className="material-symbols-outlined text-3xl text-destructive">
              error
            </span>

            <p className="mt-2 text-sm text-destructive">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                rate_review
              </span>

              <h1 className="text-2xl font-bold text-foreground">
                بررسی نظرات
              </h1>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              نظرات کاربران را قبل از انتشار بررسی و تایید کنید.
            </p>
          </div>

          <div className="shrink-0 rounded-xl border border-border bg-card px-4 py-2">
            <span className="text-sm text-muted-foreground">
              در انتظار بررسی
            </span>

            <span className="mr-2 font-semibold text-primary">
              {reviews.length}
            </span>
          </div>
        </div>

        {/* Reviews */}
        {reviews.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-border bg-card px-6 py-16 text-center">
            <span className="material-symbols-outlined text-5xl text-muted-foreground/40">
              mark_email_read
            </span>

            <h2 className="mt-4 font-semibold text-foreground">
              نظری برای بررسی وجود ندارد
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              همه نظرات بررسی شده‌اند.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                {/* Card */}
                <ReviewCard review={review} />

                {/* Actions */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
