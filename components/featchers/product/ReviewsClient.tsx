"use client";

import { useState } from "react";

import { ReviewType } from "@/types/reviewsType";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

export default function ReviewsClient({
  reviews: initialReviews,
}: {
  reviews: ReviewType[];
}) {
  const [reviews, setReviews] = useState<ReviewType[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);

  function handleDelete(reviewId: number) {
    setReviews((currentReviews) =>
      currentReviews.filter((review) => review.id !== reviewId),
    );
  }

  const addNewReview = (review: ReviewType) => {
    setReviews((currentReviews) => {
      const existingIndex = currentReviews.findIndex(
        (currentReview) => currentReview.user_id === review.user_id,
      );

      if (existingIndex === -1) {
        return [review, ...currentReviews];
      }

      return currentReviews.map((currentReview) =>
        currentReview.user_id === review.user_id ? review : currentReview,
      );
    });

    setShowForm(false);
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border py-3 text-sm font-semibold text-muted-foreground transition-all hover:border-accent hover:text-accent"
        >
          <span className="material-symbols-outlined text-base leading-none">
            edit
          </span>

          {showForm ? "بستن فرم" : "ثبت نظر شما"}
        </button>

        {showForm && (
          <ReviewForm
            onClose={() => setShowForm(false)}
            onAddReview={addNewReview}
          />
        )}
      </div>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} onDelete={handleDelete} />
      ))}
    </div>
  );
}
