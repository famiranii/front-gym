"use client";

import { useState } from "react";
import ReviewForm from "./ReviewForm";
import StarRating from "./StarRating";
import { Product, Review } from "@/types/product-detail";

function SpecsTab({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-0 divide-y divide-border">
      <p className="text-sm text-muted-foreground pb-4 leading-relaxed">{product.description}</p>
      {/* {product.specs.map((spec) => (
        <div key={spec.label} className="flex justify-between py-3 text-sm">
          <span className="text-muted-foreground font-medium">{spec.label}</span>
          <span className="font-semibold text-foreground">{spec.value}</span>
        </div>
      ))} */}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-2xl bg-muted/40 border border-border">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-sm shrink-0">
            {review.avatar}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-foreground">{review.author}</span>
              {review.verified && (
                <span className="text-[10px] font-semibold text-success bg-success/10 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[10px] leading-none">verified</span>
                  خریدار تأییدشده
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{review.date}</span>
          </div>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>
      <p className="text-sm font-bold text-foreground">{review.title}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{review.body}</p>
    </div>
  );
}

function ReviewsTab({ product }: { product: Product }) {
  const [showForm, setShowForm] = useState(false);

  // Rating distribution
  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: product.reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="flex flex-col gap-6">
      {/* Summary */}
      <div className="flex gap-6 items-center p-5 bg-muted/40 rounded-2xl border border-border">
        <div className="flex flex-col items-center gap-1 shrink-0">
          <span className="text-4xl font-extrabold text-foreground">{product.rating}</span>
          <StarRating rating={product.rating} size="sm" />
          <span className="text-xs text-muted-foreground">{product.reviewCount} نظر</span>
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          {dist.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-4 text-left">{star}</span>
              <span className="material-symbols-outlined text-warning text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-warning rounded-full transition-all"
                  style={{ width: `${(count / product.reviews.length) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-4">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Write review button */}
      <button
        onClick={() => setShowForm((v) => !v)}
        className="flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-border text-sm font-semibold text-muted-foreground hover:border-accent hover:text-accent transition-all"
      >
        <span className="material-symbols-outlined text-base leading-none">edit</span>
        {showForm ? "بستن فرم" : "ثبت نظر شما"}
      </button>

      {showForm && <ReviewForm onClose={() => setShowForm(false)} />}

      {/* Review cards */}
      <div className="flex flex-col gap-3">
        {product.reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}

const TABS = [
  { key: "specs", label: "مشخصات" },
  { key: "reviews", label: "نظرات" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<TabKey>("specs");

  return (
    <div className="flex flex-col gap-0">
      {/* Tab bar */}
      <div className="flex border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={[
              "px-5 py-3 text-sm font-bold transition-all border-b-2 -mb-px",
              active === tab.key
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="pt-5">
        {active === "specs" && <SpecsTab product={product} />}
        {active === "reviews" && <ReviewsTab product={product} />}
      </div>
    </div>
  );
}
